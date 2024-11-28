export async function executeWithRetries<T>(
  callable: () => Promise<T>,
  retryCount: number,
): Promise<T> {
  for (let i = 1; i <= retryCount; i++) {
    try {
      return await callable();
    } catch (e) {
      console.log(`Failed function call ${callable.name} on ${i} attempt`);
      if (i === retryCount) {
        throw new Error(`Failed after 5 retries with message: ${e.message}`);
      }
    }
  }
}
