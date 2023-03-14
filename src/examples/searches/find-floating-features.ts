import { Feature } from '../../base/features'
import flagSystem from '../../base/implementation'
import { FEATURES } from '../../base/mocks'

export const findFloatingFeaturesExample = async (): Promise<
  Record<string, Feature[] | string | undefined>
> => {
  const findFloatingFeatures = await flagSystem.findFloatingFeatures(FEATURES)

  return {
    findFloatingFeaturesExample:
      findFloatingFeatures.res || findFloatingFeatures.error
  }
}
