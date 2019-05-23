function list(iterable) {
    return new Proxy(Array.from(iterable), {
        get (arr, prop) {
            if (typeof prop === 'string') {
                if (Number(prop) < 0) prop = arr.length + Number(prop)
                if (arr.hasOwnProperty(prop)) return Reflect.get(arr, prop)
                if (Array.prototype.hasOwnProperty(prop)) return Array.prototype[prop].bind(arr)
                if (Number.parseInt(prop) === Number(prop)) {
                    throw RangeError('Index out of range')
                } else {
                    throw ReferenceError('Invalid index')
                }
            } else {
                return Reflect.get(arr, prop)
            }
        },
        set (arr, prop, value) {
            if (Number(prop) < 0) {
                this.get(arr, prop)
                prop = arr.length + Number(prop)
            }
            if (!Number.isInteger(Number(prop))) throw SyntaxError('Cannot set props of lists')
            Reflect.set(arr, prop, value)
            for (let i of arr.keys()) {
                if (Reflect.get(arr, i) === undefined) Reflect.set(arr, i, undefined)
            }
        },
        has (_, prop) {
            if (prop === 'length') return false
        }
    })
}

export default list
