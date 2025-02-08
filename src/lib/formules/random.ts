
class Random {
    getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    choice(array: any[], weights: number[] | null = null) {
        if (weights) {
            const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
            const randomValue = Math.random() * totalWeight;
            let cumulativeWeight = 0;

            for (let i = 0; i < array.length; i++) {
                cumulativeWeight += weights[i];
                if (randomValue < cumulativeWeight) {
                    return array[i];
                }
            }
        }
        return array[this.getRandomInt(0, array.length - 1)];
    }
}

export default Random