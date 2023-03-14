import flagSystem from '../../base/implementation'

export const dumpExample = async (): Promise<Record<string, unknown[][]>> => {
  const dump = await flagSystem.dump()

  return {
    dumpExample: dump
  }
}
