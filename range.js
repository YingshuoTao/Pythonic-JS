function range(...args) {
    args = args.slice(0,3).map(arg => Number.isNaN(Number.parseInt(arg)) ? 0 : Number.parseInt(arg))
    let [start = 0, end, step = 1] = args
    if (end === undefined) [start, end] = [0, start]
    if (step === 0) step = 1 
    let cnt = start
    return {
        [Symbol.iterator] () { return this },
        next () {
            if (cnt < end && step > 0 || cnt > end && step < 0) {
                let result = { value: cnt, done: false }
                cnt += step
                return result
            } else {
                return { value: undefined, done: true }
            }
        }
    }
}

export default range
