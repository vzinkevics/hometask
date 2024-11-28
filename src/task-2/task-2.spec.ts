import { executeWithRetries } from './task-2';

describe('executeWithRetries', () => {
  test('should succeed on the first attempt', async () => {
    const successfulFunction = jest.fn(async () => 'Success!');

    const result = await executeWithRetries(successfulFunction, 5);

    expect(result).toBe('Success!');
    expect(successfulFunction).toHaveBeenCalledTimes(1);
  });

  test('should retry until success', async () => {
    let callCount = 0;
    const retryingFunction = jest.fn(async () => {
      callCount++;
      if (callCount < 3) {
        throw new Error('Failure');
      }
      return 'Success!';
    });

    const result = await executeWithRetries(retryingFunction, 5);

    expect(result).toBe('Success!');
    expect(retryingFunction).toHaveBeenCalledTimes(3);
  });

  test('should throw an error after maximum retries', async () => {
    const alwaysFailingFunction = jest.fn(async () => {
      throw new Error('Always fails');
    });

    await expect(executeWithRetries(alwaysFailingFunction, 5)).rejects.toThrow(
      'Failed after 5 retries with message: Always fails',
    );

    expect(alwaysFailingFunction).toHaveBeenCalledTimes(5);
  });

  test('should pass the error message through correctly', async () => {
    let callCount = 0;
    const customErrorFunction = jest.fn(async () => {
      callCount++;
      throw new Error(`Custom failure ${callCount}`);
    });

    await expect(executeWithRetries(customErrorFunction, 3)).rejects.toThrow(
      'Failed after 5 retries with message: Custom failure 3',
    );

    expect(customErrorFunction).toHaveBeenCalledTimes(3);
  });
});
