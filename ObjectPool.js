
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

const fishPool = new ObjectPool(() => new Fish(), 5);

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

console.log("\nLiberando um peixe para reutilização:");
fishPool.release(fish1);

console.log("\nAdquirindo um novo peixe (reutilizado do pool):");
const fish4 = fishPool.acquire();
console.log(fish4); 

