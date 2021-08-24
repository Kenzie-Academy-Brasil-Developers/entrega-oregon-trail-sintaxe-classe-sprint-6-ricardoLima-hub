class Traveler {
    constructor (name) {
        this._name = name;
        this._amountFood = 1;
        this._isHealthy = true;
    }

    get amountFood () {
        return this._amountFood
    }

    get name () {
        return this._name
    }

    get health () {
        return this._isHealthy
    }

    set amountFood (value) {
        this._amountFood = value
    }

    set name(value){
        this._name = value
    }

    set health (value) {
        this._isHealthy = value
    }

    hunt() {
        this.amountFood+=2;
    }

    eat() {
        if (this.amountFood > 0) {
            this.amountFood--;
        } 
        if (this.amountFood <= 0) {
            this.isHealthy = false;
        }
    }
}

class Wagon {
    constructor (capacity) {
        this._capacity = capacity;
        this._passengers = [];
    }

    get capacity () {
        return this._capacity
    }

    get passengers () {
        return this._passengers
    }

    set capacity (value) {
        this._capacity = value
    }

    set passengers (value) {
        this._passengers = value
    }
    getAvailableSeatCount() {
       if (this.passengers.length === 0) {
           return this.capacity
       } 
       if (this.passengers.length !== 0) {
           return this.capacity - this.passengers.length
       }
    }

    join (traveler) {
        let seats = this.getAvailableSeatCount()
        if (seats >= 1) {
            this.passengers.push(traveler)
        }
    }

    shouldQuarantine () {
        let output = false
        this.passengers.map((item) => {
            if (!item.isHealthy) {
                return output = true
            }
        })
        return output
    }

    totalFood () {
        let output =  this.passengers.reduce((totalFood, {amountFood}) => {
            return totalFood + amountFood
        },0)
        return output
    }
}

// Criar uma carroça que comporta 2 pessoas
let wagon = new Wagon(2);
// Criar três viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let maude = new Traveler('Maude');

console.log(`${wagon.getAvailableSeatCount()} should be 2`);

wagon.join(henrietta);
console.log(`${wagon.getAvailableSeatCount()} should be 1`);

wagon.join(juan);
wagon.join(maude); // Não tem espaço para ela!
console.log(`${wagon.getAvailableSeatCount()} should be 0`);

henrietta.hunt(); // pega mais comida
juan.eat();
juan.eat(); // juan agora está com fome (doente)

console.log(`${wagon.shouldQuarantine()} should be true since juan is sick`);
console.log(`${wagon.totalFood()} should be 3`);