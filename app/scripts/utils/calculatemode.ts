interface arrayMathReducerFunction {
    (nums: number[]): number
}

const calculateMode: arrayMathReducerFunction = (nums: number[]) => {
    if(!nums || nums.length === 0) return 0;

    const dictionary = {} as any
    nums.forEach(num => {
        if(dictionary[num]){
            dictionary[num]++;
        } else {
            dictionary[num] = 1
        }
    });
    return +Object.keys(dictionary)
            .map(key => [key, dictionary[key]])
            .sort((a, b) => b[1] - a[1])[0][0]
}

const quickTest = () => {
    let arr1 = [1, 2, 3, 4, 5, 6, ,5 ,6 ,6, 7, 7, 8, 5, 6, 4]
    let arr2 = [2,3,2,2,2,2,2,,2,2,2,2,3]
    let arr3 = []
    let arr4 = [1]
    let arr5 = [6,6,6,6,6,7,7,7,7,7]

    console.log(calculateMode(arr5))
}

export default calculateMode;