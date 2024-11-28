// Weighted random algorithm
export function randomByWeight(values: string[], weights: number[]): string {
  let total = 0;

  // Sum total of weights
  weights.forEach((weight) => {
    total += weight;
  });

  // Random a number between [1, total]
  const random = Math.ceil(Math.random() * total); // [1,total]

  // Seek cursor to find which area the random is in
  let cursor = 0;
  for (let i = 0; i < weights.length; i++) {
    cursor += weights[i];
    if (cursor >= random) {
      return values[i];
    }
  }
}
