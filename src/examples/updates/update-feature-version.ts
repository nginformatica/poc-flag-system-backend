import { FeatureVersion, UpdateFeatureVersionReturn } from 'flag-system'
import { Feature } from '../../base/features'
import { Flag } from '../../base/flags'
import flagSystem from '../../base/implementation'

export const updateFeatureVersionExample = async (): Promise<
  Record<string, UpdateFeatureVersionReturn<Feature, Flag> | string | undefined>
> => {
  const updateFeatureVersionResult = await flagSystem.updateFeatureVersion(
    Feature.A,
    FeatureVersion.Stable,
    Flag.A
  )

  return {
    updateFeatureVersionExample:
      updateFeatureVersionResult.res || updateFeatureVersionResult.error
  }
}
