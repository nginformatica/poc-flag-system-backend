import { FeatureVersion } from 'flag-system'
import { Feature } from '../../base/features'
import { Flag } from '../../base/flags'
import flagSystem from '../../base/implementation'

export const registerFlagExample = async (): Promise<
  Record<string, Flag | string | undefined>
> => {
  const registerFlagResult = await flagSystem.registerFlag(Flag.A, 1, [
    {
      feature: Feature.B,
      version: FeatureVersion.Stable
    }
  ])

  return {
    registerFlagExample: registerFlagResult.res || registerFlagResult.error
  }
}
