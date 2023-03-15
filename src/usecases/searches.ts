import { Feature } from '../base/features'
import { Flag } from '../base/flags'
import flagSystem from '../base/implementation'
import { FEATURES, FLAGS } from '../base/mocks'

/**
 * NOTE: Casos de uso para o Flag System - Buscas e Analises
 *
 * Flag System possui algumas funções que podem ser utilizadas para obter informações
 * sobre as flags e features do sistema.
 *
 */

/**
 * NOTE: Find Floating Flags
 * Podemos realizar uma busca por flags que não estão registradas no sistema
 *
 * Para esse exemplo iremos assumir que existem 3 flags declaradas no sistema:
 * - flagA
 * - flagB
 * - flagC
 *
 * E que existe apenas o registro da flagA no sistema
 */
const findFloatingFlagsExample = async () => {
  const { res } = await flagSystem.findFloatingFlags(FLAGS)

  /**
   * Nesse exemplo, a função retorna um array com as flags que não estão registradas
   * no sistema
   */
  console.log(res) // ['flagB', 'flagC']
}

/**
 * NOTE: Find Floating Features
 * Podemos realizar uma busca por features que não estão registradas no sistema
 *
 * Para esse exemplo iremos assumir que existem 3 features declaradas no sistema:
 * - featureA
 * - featureB
 * - featureC
 *
 * E que existe apenas o registro da flagA no sistema:
 * - flagA
 * - features: [
 *    { feature: Feature.A, version: FeatureVersion.Stable },
 *    { feature: Feature.B, version: FeatureVersion.Stable }
 *  ]
 */
const findFloatingFeaturesExample = async () => {
  const { res } = await flagSystem.findFloatingFeatures(FEATURES)

  /**
   * Nesse exemplo, a função retorna um array com as features que não estão
   * registradas no sistema
   */
  console.log(res) // ['featureC']
}

/**
 * NOTE: Find Flags Related To Feature
 *
 * Podemos realizar uma busca por flags que estão associadas a uma feature, muito
 * util para descobrir quais flags estão associadas a uma feature e assim poder
 * realizar uma analise de quais flags podem ser removidas do sistema.
 *
 * Para esse exemplo iremos assumir que existem 3 flags declaradas no sistema:
 * - flagA
 * - flagB
 * - flagC
 *
 * E que existem os registros da flagA e flagB no sistema:
 * - flagA
 * - features: [
 *   { feature: Feature.A, version: FeatureVersion.Stable },
 *   { feature: Feature.B, version: FeatureVersion.Stable }
 * ]
 * - flagB
 * - features: [
 *  { feature: Feature.A, version: FeatureVersion.Stable },
 *  { feature: Feature.C, version: FeatureVersion.Stable }
 * ]
 */
const findFlagsRelatedToFeatureExample = async () => {
  const { res: resFeatA } = await flagSystem.findFlagsRelatedToFeature(
    Feature.A
  )
  const { res: resFeatC } = await flagSystem.findFlagsRelatedToFeature(
    Feature.C
  )

  /**
   * Nesse exemplo, a função retorna um array com as flags que estão associadas
   * a featureA
   */
  console.log(resFeatA) // ['flagA', 'flagB']
  console.log(resFeatC) // ['flagB']
}

/**
 * NOTE: Find Features Related To Flag
 *
 * Podemos também realizar uma busca por features que estão associadas a uma flag
 * bem como a versão da feature que está associada a flag.
 *
 * Para esse exemplo iremos assumir que existem 3 features declaradas no sistema:
 * - featureA
 * - featureB
 * - featureC
 *
 * E que existem os registros da flagA e flagB no sistema:
 * - flagA
 * - features: [
 *    { feature: Feature.A, version: FeatureVersion.Stable },
 *    { feature: Feature.B, version: FeatureVersion.Development }
 *  ]
 *
 * - flagB
 * - features: [
 *    { feature: Feature.A, version: FeatureVersion.Development },
 *    { feature: Feature.C, version: FeatureVersion.Stable }
 *  ]
 *
 */
const findFeaturesRelatedToFlagExample = async () => {
  const { res: resFlagA } = await flagSystem.findFeaturesRelatedToFlag(Flag.A)
  const { res: resFlagB } = await flagSystem.findFeaturesRelatedToFlag(Flag.B)

  /**
   * Nesse exemplo, a função retorna um array com as features que estão associadas
   * a flagA
   */
  console.log(resFlagA)
  /**
   * [
   *  { feature: Feature.A, version: FeatureVersion.Stable },
   *  { feature: Feature.B, version: FeatureVersion.Development }
   * ]
   */
  console.log(resFlagB)
  /**
   * [
   *   { feature: Feature.A, version: FeatureVersion.Development },
   *   { feature: Feature.C, version: FeatureVersion.Stable }
   * ]
   */
}

/**
 * NOTE: Find Any Feature Collision
 *
 * Podemos realizar uma busca por features que estão presentes em mais de uma flag,
 * isso pode ser util para descobrir algum problema relacionado a prioridade de
 * features.
 *
 * Por exemplo, se uma feature está presente em mais de uma flag, caso as prioridades
 * das flags nao sejam definidas de forme estratégica, pode ocorrer de uma feature
 * que deveria estar desabilitada estar habilitada, ou vice-versa,
 * findAnyFeatureCollision pode ser util na detecção e correção desses problemas.
 *
 * Para esse exemplo iremos assumir que existem 3 features declaradas no sistema:
 * - featureA
 * - featureB
 * - featureC
 *
 * E que existem os registros da flagA e flagB no sistema:
 * - flagA
 * - priority: 1
 * - features: [
 *   { feature: Feature.A, version: FeatureVersion.Stable },
 *   { feature: Feature.B, version: FeatureVersion.Stable }
 * ]
 *
 * - flagB
 * - priority: 2
 * - features: [
 *   { feature: Feature.A, version: FeatureVersion.Development },
 *   { feature: Feature.C, version: FeatureVersion.Stable }
 * ]
 */
const findAnyFeatureCollisionExample = async () => {
  const { res } = await flagSystem.findAnyFeatureCollision()

  /**
   * Nesse exemplo, a função retorna um array com a feature que está em colisão
   * entre as flags e a prioridade de cada flag que está associada a feature
   */
  console.log(res)
  /**
   * [
        {
        feature: 'featA',
        flags: [
            {
                flag: 'flagA',
                priority: 1
            },
            {
                flag: 'flagB',
                priority: 2
            }
        ]
        }
  ]
   */
}
