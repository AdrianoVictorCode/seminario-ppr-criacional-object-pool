## Padrão Object Pool

### Motivação:
Criar e destruir objetos repetidamente pode ser ineficiente, especialmente quando os objetos são pesados, como conexões com banco de dados, conexões de rede ou mesmo entidades em um jogo.

O Object Pool resolve esse problema mantendo um conjunto de objetos reutilizáveis. Quando um objeto não está mais sendo utilizado, ele volta ao pool para ser reaproveitado posteriormente, reduzindo a carga no sistema.

@startuml
' Classe que gerencia o pool de objetos
class EntityPool {
    - pool : List<Entity>
    - createFn : () -> Entity
    - maxSize : int
    + acquire() : Entity
    + release(Entity)
}

' Classe base Entity
class Entity {
    + type : String
    + health : int
    + speed : int
    + damage : int
}

' Subclasse Enemy utilizada no pool
class Enemy extends Entity {
    + ai : String
}

EntityPool --> Entity : "gerencia"
Entity <|-- Enemy
@enduml


## Exemplo:

```js

// Implementação do Pool de Objetos

class EntityPool {
    constructor(createFn, maxSize = 5) {
        this.createFn = createFn; 
        this.pool = [];
        this.maxSize = maxSize;

        for (let i = 0; i < maxSize; i++) {
            this.pool.push(this.createFn());
        }
    }

    // Obtém um objeto do pool (ou cria um novo se necessário)
    acquire() {
        return this.pool.length > 0 ? this.pool.pop() : this.createFn();
    }

    // Libera um objeto e o devolve ao pool
    release(obj) {
        if (this.pool.length < this.maxSize) {
            this.pool.push(obj);
        }
    }
}

// Criando um pool de inimigos do tipo "ranged"
const rangedEnemyPool = new EntityPool(() => new Enemy(5, 2, 3, "ranged"), 3);

// Pegando uma entidade do pool
const enemy3 = rangedEnemyPool.acquire();

```

& Implementado por: Adriano Victor e Pedro Victor Hipolito