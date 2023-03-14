import { FeatureInstance } from 'flag-system'
import { Feature } from '../../base/features'
import { Flag } from '../../base/flags'
import flagSystem from '../../base/implementation'

export const findFeaturesRelatedToFlagExample = async (): Promise<
  Record<string, FeatureInstance<Feature>[] | string | undefined>
> => {
  const findFeaturesRelatedToFlag = await flagSystem.findFeaturesRelatedToFlag(
    Flag.A
  )

  return {
    findFeaturesRelatedToFlagExample:
      findFeaturesRelatedToFlag.res || findFeaturesRelatedToFlag.error
  }
}
