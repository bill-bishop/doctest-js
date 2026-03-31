declare function doctest(
  filePath: string,
  options?: {
    instance?: object
    imports?: Record<string, unknown>
  }
): void

export default doctest
