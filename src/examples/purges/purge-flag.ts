import { Flag } from '../../base/flags'
import flagSystem from '../../base/implementation'

export const purgeFlagExample = async (): Promise<
  Record<string, Flag[] | string | undefined>
> => {
  const purgeFlagResult = await flagSystem.purgeFlag(Flag.A, 'force')

  return {
    purgeFlagExample: purgeFlagResult.res || purgeFlagResult.error
  }
}
