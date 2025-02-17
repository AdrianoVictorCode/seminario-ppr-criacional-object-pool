class EntityPool {
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

const rangedEnemyPool = new EntityPool(() => new Enemy(5, 2, 3, "ranged"), 3);

const enemy3 = rangedEnemyPool.acquire();
