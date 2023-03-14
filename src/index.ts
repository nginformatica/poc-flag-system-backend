import {
  purgeFeatureExample,
  purgeFlagExample,
  findAnyFeatureCollisionExample,
  findFeaturesRelatedToFlagExample,
  findFlagsRelatedToFeatureExample,
  findFloatingFeaturesExample,
  findFloatingFlagsExample,
  dumpExample,
  flagEntityExample,
  registerFlagExample,
  updateFeatureVersionExample,
  updateFlagExample,
  canUserAccessFeatureExample
} from './examples'

const main = async () => {
  const res = await Promise.all([
    // Purges Examples
    purgeFeatureExample(),
    purgeFlagExample(),

    // Searches Examples
    findAnyFeatureCollisionExample(),
    findFeaturesRelatedToFlagExample(),
    findFlagsRelatedToFeatureExample(),
    findFloatingFeaturesExample(),
    findFloatingFlagsExample(),

    // Support Examples
    dumpExample(),

    // Updates Examples
    updateFeatureVersionExample(),
    flagEntityExample(),
    registerFlagExample(),
    updateFlagExample(),

    // Validations Examples
    canUserAccessFeatureExample()
  ])

  res.forEach((r) => console.log(r))
}

main()
