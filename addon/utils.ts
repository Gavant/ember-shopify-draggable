export function insertAt(array: any[], index: number, item: any) {
    return [
        // part of the array before the specified index
        ...array.slice(0, index),
        // inserted item
        item,
        // part of the array after the specified index
        ...array.slice(index)
    ];
}

export function removeAt(array: any[], index: number) {
    return [
        // part of the array before the specified index
        ...array.slice(0, index),
        // part of the array after the specified index
        ...array.slice(index + 1)
    ];
}

export function moveElementTo(originalArray: any[], from: number, to: number) {
    const array = [...originalArray];
    var element = array[from];
    array.splice(from, 1);
    array.splice(to, 0, element);
    return array;
}
