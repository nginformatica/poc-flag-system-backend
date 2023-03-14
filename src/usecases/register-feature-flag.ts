import { FeatureVersion } from 'flag-system'
import { Feature } from '../base/features'
import { Flag } from '../base/flags'
import flagSystem from '../base/implementation'
import { FLAGS } from '../base/mocks'

/**
 * NOTE: Casos de uso para o Flag System - Registro de Feature Flag
 *
 * Toda feature flag deve ser registrada no Flag System antes de ser utilizada,
 * dessa forma, mesmo que os valores das Feature e das Flag estejam declaradas
 * no sistema, as mesmas so serão utilizadas após o registro.
 */

/**
 * Para o exemplo iremos assumir que o sistema nao possui nenhum registro de
 * feature flag
 *
 * FLAGS possuem a lista com as Flags declaradas no sistema: ['a', 'b', 'c']
 */
const registerFeatureFlagExample = async () => {
  const { res: floatingBeforeReg } = await flagSystem.findFloatingFlags(FLAGS)

  const { res: resReg } = await flagSystem.registerFlag(
    Flag.A, // A flag que será registrada
    1, // A ordem de prioridade que essa flag tera no sistema
    [
      // Quais as features que essa flag possui acesso, bem como a versão
      {
        feature: Feature.A,
        version: FeatureVersion.Stable
      },
      {
        feature: Feature.B,
        version: FeatureVersion.Stable
      }
    ]
  )

  const { res: floatingAfterReg } = await flagSystem.findFloatingFlags(FLAGS)

  /**
   * Nesse exemplo, a flag A foi registrada no sistema, desse modo a mesma deixa
   * de ser considerada como uma flag flutuante, ou seja, uma flag que não possui
   * nenhum registro no sistema e passa a ser utilizada durante a validação de
   * acesso a feature
   */
  console.log(floatingBeforeReg) // ['a', 'b', 'c']
  console.log(resReg) // ['a']
  console.log(floatingAfterReg) // ['b', 'c']
}

/**
 * NOTE: Casos de uso para o Flag System - Atualização de Feature Flag
 *
 * Toda feature flag pode ser atualizada no Flag System, dessa forma, mesmo que
 * a flag já esteja registrada no sistema, a mesma pode ser atualizada para que
 * possa ser utilizada com novas features, novas versões de features ou nova ordem
 * de prioridade.
 *
 * Para o exemplo iremos assumir que o sistema possui o registro da flag A
 *
 * - flag A:
 *  - prioridade: 1
 *  - features: [{ feature: Feature.A, version: FeatureVersion.Stable }]
 */
const updateFeatureFlagExample = async () => {
  const { res: beforeFeatUpdate } = await flagSystem.canUserAccessFeature(
    'user-id',
    Feature.A
  )

  await flagSystem.updateFlag(
    Flag.A, // A flag que será atualizada
    1, // A nova ordem de prioridade que essa flag tera no sistema
    [
      // Quais as novas features que essa flag possui acesso, bem como a versão
      {
        feature: Feature.A,
        version: FeatureVersion.Development
      }
    ],
    'insert' // O tipo de atualização que será realizada
  )

  const { res: afterFeatUpdate } = await flagSystem.canUserAccessFeature(
    'user-id',
    Feature.A
  )

  console.log(beforeFeatUpdate) // { available: true, version: 'STABLE'}
  console.log(afterFeatUpdate) // { available: true, version: 'DEVELOPMENT'}

  /**
   * Nesse exemplo, o usuário possui acesso a feature A na versão STABLE, porém
   * a flag A foi atualizada para que o usuário possua acesso a feature A na
   * versão DEVELOPMENT
   */
}

/**
 * NOTE: Casos de uso para o Flag System - Operações de atualização de Feature Flag
 *
 * O Flag System possui 2 tipos de operações de atualização de Feature Flag:
 *
 * - insert: Ira preservar as features já existentes na flag e ira adicionar as novas
 * - update: Ira descartar as features já existentes na flag e ira adicionar as novas
 *
 * Para o exemplo iremos assumir que o sistema possui o registro:
 *
 * - flag A:
 *  - prioridade: 1
 *  - features: [{ feature: Feature.A, version: FeatureVersion.Stable }]
 */
const updateFeatureFlagOperationsExample = async () => {
  await flagSystem.updateFlag(
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

  /**
   * Apos a operação de insert, a flag A possui as seguintes features:
   *
   * - flag A:
   *  - prioridade: 1
   *  - features: [
   *        { feature: Feature.A, version: FeatureVersion.Stable }
   *        { feature: Feature.B, version: FeatureVersion.Stable }
   *    ]
   */

  await flagSystem.updateFlag(
    Flag.A,
    1,
    [
      {
        feature: Feature.C,
        version: FeatureVersion.Stable
      }
    ],
    'update'
  )

  /**
   * Apos a operação de insert, a flag A possui as seguintes features:
   *
   * - flag A:
   *  - prioridade: 1
   *  - features: [{ feature: Feature.C, version: FeatureVersion.Stable }]
   */
}
