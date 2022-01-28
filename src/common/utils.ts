export function getRandomOrder<T>(data: T[]) {
    const result = [...data]
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = result[j] as T
        result[j] = result[i] as T
        result[i] = temp
    }

    return result
}
