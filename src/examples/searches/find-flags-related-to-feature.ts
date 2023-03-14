import { RelatedFlagReturn } from 'flag-system'
import { Feature } from '../../base/features'
import { Flag } from '../../base/flags'
import flagSystem from '../../base/implementation'

export const findFlagsRelatedToFeatureExample = async (): Promise<
  Record<string, RelatedFlagReturn<Flag>[] | string | undefined>
> => {
  const findFlagsRelatedToFeature = await flagSystem.findFlagsRelatedToFeature(
    Feature.A
  )

  return {
    findFlagsRelatedToFeatureExample:
      findFlagsRelatedToFeature.res || findFlagsRelatedToFeature.error
  }
}
