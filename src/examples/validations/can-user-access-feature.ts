import { FeatureValidationReturn } from 'flag-system'
import { Feature } from '../../base/features'
import flagSystem from '../../base/implementation'

export const canUserAccessFeatureExample = async (): Promise<
  Record<string, FeatureValidationReturn | string | undefined>
> => {
  const canUserAccessFeatureResult = await flagSystem.canUserAccessFeature(
    'user-id',
    Feature.A
  )

  return {
    canUserAccessFeatureExample:
      canUserAccessFeatureResult.res || canUserAccessFeatureResult.error
  }
}
