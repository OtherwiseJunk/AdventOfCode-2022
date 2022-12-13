export function range(size: number, startAt = 0){
    return [...Array(size).keys()].map(i => i + startAt);
}

export function rotateClockwise<T>(array: T[][]){
    return array[0].map((_, index) => array.map(row => row[index]))
};