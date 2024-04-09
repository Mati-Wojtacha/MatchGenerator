export function generateCombinations(nInput = 0) {
    let lastIndex = 0;
    if (nInput % 2 !== 0) {
        nInput += 1;
        lastIndex = nInput;
    }
    const input = Array.from({ length: nInput }, (_, i) => i + 1);
    const result = [];
    const n = input.length;

    for (let i = 0; i < (1 << n); i++) {
        const combination = [];
        for (let j = 0; j < n; j++) {
            if ((i & (1 << j)) > 0) {
                combination.push(input[j]);
            }
        }
        if (combination.length === n / 2) {
            if (lastIndex !== 0) {
                const indexToRemove = combination.indexOf(lastIndex);
                if (indexToRemove !== -1) {
                    combination.splice(indexToRemove, 1);
                }
            }
            result.push(combination);
        }
    }

    const halfCount = Math.floor(result.length / 2);
    const firstHalf = result.slice(0, halfCount);
    const secondHalf = result.slice(halfCount).reverse();

    return firstHalf.map((arr, i) => [i + 1, arr, secondHalf[i]]);
}
