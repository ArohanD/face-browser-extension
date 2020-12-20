const calculateMode = (nums: number[]) => {
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

export default calculateMode;