function zip(...args) {
    let iterators = args.map(arg => arg[Symbol.iterator] ? arg[Symbol.iterator]() : { next () { return { value: undefined, done: true } } })
    return {
        [Symbol.iterator] () { return this },
        next () {
            let results = iterators.map(iterator => iterator.next())
            if (results.every(result => !result.done)) {
                return { value: results.map(result => result.value), done: false }
            } else {
                return { value: undefined, done: true }
            }
        }
    }
}

export default zip
