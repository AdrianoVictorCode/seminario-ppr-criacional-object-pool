

## Motivação:
Imagine que estamos desenvolvendo um jogo de pesca em que peixes são criados e descartados constantemente durante a simulação. Cada vez que um peixe é "capturado" ou "solto" no ambiente, um objeto do tipo Fish precisa ser criado ou destruído. Se criarmos um novo objeto a cada evento, o custo de alocação e a pressão sobre o coletor de lixo podem causar quebras de performance ou gargalos de memória, principalmente em dispositivos com recursos limitados.

### Problema:
- Criação repetitiva: Instanciar objetos repetidamente pode ser custoso.
- Gerenciamento de memória: A criação e destruição frequentes de objetos aumenta a pressão sobre o coletor de lixo.
- Performance: Em jogos ou aplicações em tempo real, essa sobrecarga pode causar quedas de frame e atrasos.

### Solução com o Object Pool:
O padrão Object Pool resolve esse problema pré-criando um conjunto de objetos (neste caso, objetos do tipo Fish) e os mantendo em um "pool". Quando um novo peixe é necessário, o jogo adquire um objeto do pool (por meio do método acquire()) e, quando o objeto não é mais necessário, ele é retornado ao pool (por meio do método release()) para ser reutilizado posteriormente. Isso reduz a sobrecarga de criação/destruição e melhora a performance geral da aplicação.


## Estrutura

@startuml
title Object Pool Pattern - Exemplo com Fish

class Fish {
  - size: Number
  - race: String
  - weight: Number
  + Fish(size: Number = 0, race: String = "none", weight: Number = 0)
  + reset(size: Number, race: String, weight: Number): void
}

class ObjectPool {
  - createFn: Function
  - pool: Array
  - maxSize: Number
  + ObjectPool(createFn: Function, maxSize: Number = 5)
  + acquire(): Fish
  + release(obj: Fish): void
}

' Indica que o ObjectPool gerencia objetos do tipo Fish
ObjectPool --> Fish : gerencia

@enduml

## Participantes




## Exemplo:

```js

// Implementação do Pool de Objetos

class Fish {
    constructor(size = 0, race = "none", weight = 0) {
        this.size = size;
        this.race = race;
        this.weight = weight;
    }

    reset(size, race, weight) {
        this.size = size;
        this.race = race;
        this.weight = weight;
    }
}

// Pool de Objetos (Object Pool)
class ObjectPool {
    constructor(createFn, maxSize = 5) {
        this.createFn = createFn;
        this.pool = [];
        this.maxSize = maxSize;

        for (let i = 0; i < maxSize; i++) {
            this.pool.push(this.createFn());
        }
    }

    acquire() {
        return this.pool.length > 0 ? this.pool.pop() : this.createFn();
    }

    release(obj) {
        if (this.pool.length < this.maxSize) {
            this.pool.push(obj);
        }
    }
}

    // Criando um pool de peixes com capacidade máxima de 5
    const fishPool = new ObjectPool(() => new Fish(), 5);

    // Simulando o uso do Pool
    console.log("Adquirindo 3 peixes:");
    const fish1 = fishPool.acquire();
    fish1.reset(10, "Salmon", 5);
    console.log(fish1);

    const fish2 = fishPool.acquire();
    fish2.reset(15, "Cod", 8);
    console.log(fish2);

    const fish3 = fishPool.acquire();
    fish3.reset(7, "Tuna", 4);
    console.log(fish3);

    // Devolvendo um peixe ao pool
    console.log("\nLiberando um peixe para reutilização:");
    fishPool.release(fish1);

    // Reutilizando um peixe do pool
    console.log("\nAdquirindo um novo peixe (reutilizado do pool):");
    const fish4 = fishPool.acquire();
    console.log(fish4); // Esse peixe pode ser o mesmo `fish1` reutilizado



```

& Implementado por: Adriano Victor e Pedro Victor Hipolito