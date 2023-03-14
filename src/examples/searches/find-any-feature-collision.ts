import { FeatureCollisionReturn } from 'flag-system'
import { Feature } from '../../base/features'
import { Flag } from '../../base/flags'
import flagSystem from '../../base/implementation'

export const findAnyFeatureCollisionExample = async (): Promise<
  Record<string, FeatureCollisionReturn<Feature, Flag>[] | string | undefined>
> => {
  const findAnyFeatureCollision = await flagSystem.findAnyFeatureCollision()

  return {
    findAnyFeatureCollisionExample:
      findAnyFeatureCollision.res || findAnyFeatureCollision.error
  }
}
