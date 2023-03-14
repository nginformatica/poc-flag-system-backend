import { FeatureVersion } from 'flag-system'
import { Feature } from '../base/features'
import { Flag } from '../base/flags'
import flagSystem from '../base/implementation'

/**
 * NOTE: Casos de uso para o Flag System - Adicionar Flag a uma entidade
 *
 * Uma entidade é um usuário ou uma organização, essa entidade pode ter uma ou mais
 * flags associadas a ela e é com base nessa associação que o sistema irá definir
 * qual versão da feature o usuário possui acesso.
 *
 */

/**
 * Para esse exemplo iremos assumir que o usuário nao possui nenhuma flag associada
 * e que a flag A possui:
 * - prioridade: 1
 * - features: [{ feature: Feature.A, version: FeatureVersion.Stable }]
 */
const addFlagToEntityExample = async () => {
  const { res: beforeInsert } = await flagSystem.canUserAccessFeature(
    'user-id',
    Feature.A
  )

  await flagSystem.flagEntity('user-ir', Flag.A, 'user', 'insert')

  const { res: afterInsert } = await flagSystem.canUserAccessFeature(
    'user-id',
    Feature.A
  )

  /**
   * Nesse exemplo levamos em consideração apenas o fato do usuário ter acesso ou não
   * a feature.
   */
  console.log(beforeInsert) // { available: false, version: undefined }
  console.log(afterInsert) // { available: true, version: 'STABLE' }

  await flagSystem.updateFlag(
    Flag.A,
    1,
    [
      {
        feature: Feature.A,
        version: FeatureVersion.Development
      }
    ],
    'update'
  )

  const { res: afterFlagUpdate } = await flagSystem.canUserAccessFeature(
    'user-id',
    Feature.A
  )

  /**
   * Nesse exemplo levamos em consideração o fato do usuário ter acesso a feature
   * e a versão da feature que ele possui acesso.
   */
  console.log(afterFlagUpdate) // { available: true, version: 'DEVELOPMENT' }
}
