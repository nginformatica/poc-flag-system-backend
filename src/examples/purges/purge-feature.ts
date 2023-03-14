import { PurgeFeatureReturn } from 'flag-system'
import { Feature } from '../../base/features'
import { Flag } from '../../base/flags'
import flagSystem from '../../base/implementation'

export const purgeFeatureExample = async (): Promise<
  Record<string, PurgeFeatureReturn<Flag> | string | undefined>
> => {
  const purgeFlagResult = await flagSystem.purgeFeature(Feature.A)

  return {
    purgeFeatureExample: purgeFlagResult.res || purgeFlagResult.error
  }
}
