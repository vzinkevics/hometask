import { randomByWeight } from './task-1';

test('randomByWeight dispenses fruits according to probabilities', () => {
  const results = { apple: 0, pear: 0, orange: 0, peach: 0, mango: 0 };
  const iterations = 100000;

  // Run the random fruit generator many times
  for (let i = 0; i < iterations; i++) {
    const fruit = randomByWeight(
      ['apple', 'pear', 'orange', 'peach', 'mango'],
      [50, 20, 15, 10, 5],
    );
    results[fruit]++;
  }

  // Calculate probabilities
  const appleProb = results.apple / iterations;
  const pearProb = results.pear / iterations;
  const orangeProb = results.orange / iterations;
  const peachProb = results.peach / iterations;
  const mangoProb = results.mango / iterations;

  // Set a tolerance to check probabilities
  const tolerance = 0.01;

  expect(appleProb).toBeCloseTo(0.5, tolerance);
  expect(pearProb).toBeCloseTo(0.2, tolerance);
  expect(orangeProb).toBeCloseTo(0.15, tolerance);
  expect(peachProb).toBeCloseTo(0.1, tolerance);
  expect(mangoProb).toBeCloseTo(0.05, tolerance);
});
