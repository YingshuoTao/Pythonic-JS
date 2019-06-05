function enumerate(iterable, start=0) {
    if (!iterable || !iterable[Symbol.iterator]) return {
        [Symbol.iterator] () { return this },
        next () { return { value: undefined, done: true } }
    }
    let iterator = iterable[Symbol.iterator]()
    let cnt = Number.parseInt(start) || 0
    return {
        [Symbol.iterator] () { return this },
        next () {
            let result = iterator.next()
            if (!result.done) {
                return { value: [cnt++, result.value], done: false }
            } else {
                return { value: undefined, done: true }
            }
        }
    }
}

export default enumerate
