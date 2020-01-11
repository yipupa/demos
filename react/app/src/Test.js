function fn(target, key, descriptor) {
    console.log(target, key, descriptor)
}

function start() {
    return function (target, key, descriptor) {
        target.prototype.setName = function (name) {
            this.name = name;
        }
    }
}

function move() {
    return function (target, key, descriptor) {
        target.prototype.setAge = function (age) {
            this.age = age;
        }
    }
}


function end() {
    return function (target, key, descriptor) {
        target.prototype.say = function () {
            console.log(this.name, this.age)
        }
    }
}

function reset(num) {
    return function (target, key, descriptor) {
        const fn = descriptor.value;
        descriptor.value = (...args) => {
            args[0] = num;
            return fn.apply(target, args);
        }
        return descriptor;
    }
}

@start('dzq')
@move(18)
@end()
class Person {
    constructor(num) {
        this.num = num;
    }

    @fn
    say() {
        console.log(this.num);
    }

    @reset(1)
    double(num) {
        this.num *= num;
        console.log(this.num);
    }
}


const obj = new Person(1111);

// obj.say();
// obj.double(2);

console.log(obj)
obj.setName('dzq')
obj.setAge(18)
console.log(obj)

obj.say()

// Test.prototype = {
//     say: function () {
//         console.log(this.num);
//     },
//     double: function () {
//         this.num *= 2;
//     }
// }