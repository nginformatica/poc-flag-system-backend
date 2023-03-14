import { FeatureVersion } from 'flag-system'
import { Feature } from '../base/features'
import flagSystem from '../base/implementation'
import { Flag } from '../base/flags'

/**
 * NOTE: Casos de uso para o Flag System - Controle de Versão de Feature
 *
 * Toda feature é registrada no Flag System com uma versão, como forma de controlar
 * o crescimento da feature ate certo ponto, o sistema permite versões predefinidas,
 * sendo elas:
 *
 * - STABLE: Versão considerada estável da feature
 * - DEVELOPMENT: Versão considerada de desenvolvimento da feature
 * - NOT_AVAILABLE: Versão não disponível da feature, em caso que o usuário não tenha
 * acesso a feature
 * - FALL_BACK: Versão de fallback da feature
 */

/**
 * Para o exemplo iremos assumir que o usuário A possui acesso a feature A na versão
 * estável e o usuário B possui acesso a feature A na versão de desenvolvimento.
 */
const versionControlExample = async () => {
  const { res: resFeatureA } = await flagSystem.canUserAccessFeature(
    'user-a-id',
    Feature.A
  )

  const { res: resFeatureB } = await flagSystem.canUserAccessFeature(
    'user-b-id',
    Feature.A
  )

  console.log(resFeatureA) // { available: true, version: 'STABLE' }
  console.log(resFeatureB) // { available: true, version: 'DEVELOPMENT'}

  /**
   * Sabendo qual a versão da feature que o usuário possui acesso, podemos
   * decidir qual versão de determinada feature retornar ao usuário, isso permite a
   * evolução da feature de forma organizada e controlada.
   */
}

/**
 * NOTE: Casos de uso para o Flag System - Update de versão de feature
 *
 * O Flag System permite que a versão de uma feature seja atualizada, para isso
 * basta utilizar o método updateFeatureVersion
 */
const updateFeatureVersionExample = async () => {
  const updateFeatureVersionResult = await flagSystem.updateFeatureVersion(
    Feature.A,
    FeatureVersion.Stable,
    Flag.A
  )

  /**
   * O método updateFeatureVersion retorna um objeto com a feature, a nova versão
   * e a flag da qual a feature foi atualizada.
   */
  console.log(updateFeatureVersionResult)
  /**
   * res: {
   *   feature: 'featureA',
   *   version: 'STABLE',
   *   flag: 'flagA'
   * }
   */
}
