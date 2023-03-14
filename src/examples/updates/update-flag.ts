import { FeatureVersion } from 'flag-system'
import { Feature } from '../../base/features'
import { Flag } from '../../base/flags'
import flagSystem from '../../base/implementation'

export const updateFlagExample = async (): Promise<
  Record<string, Flag | string | undefined>
> => {
  const updateFlagResult = await flagSystem.updateFlag(
    Flag.A,
    1,
    [
      {
        feature: Feature.B,
        version: FeatureVersion.Stable
      }
    ],
    'insert'
  )

  return {
    updateFlagExample: updateFlagResult.res || updateFlagResult.error
  }
}
