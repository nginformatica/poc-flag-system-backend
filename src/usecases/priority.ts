import { Feature } from '../base/features'
import flagSystem from '../base/implementation'

/**
 * NOTE: Casos de uso para o Flag System - Sistema de prioridade
 *
 * Toda Feature Flag possui uma prioridade, essa prioridade é utilizada para definir
 * qual a ordem de prioridade que a flag terá no sistema, ou seja, se uma flag possui
 * uma prioridade maior que outra, a mesma terá prioridade sobre a outra.
 *
 * A prioridade é definida por um número inteiro entre 1 e 10, sendo que quanto maior o número,
 * maior a prioridade da flag.
 */

/**
 * Para o exemplo iremos assumir que o flag A e a flag B possuem:
 *
 * - flag A:
 *  - prioridade: 1
 *  - features: [{ feature: Feature.A, version: FeatureVersion.Stable }]
 *
 * - flag B:
 *  - prioridade: 2
 *  - features: [{ feature: Feature.A, version: FeatureVersion.Development }]
 *
 *  Também iremos assumir que o usuário possui ambas as flags
 */
const priorityExample = async () => {
  const { res } = await flagSystem.canUserAccessFeature('user-id', Feature.A)

  /**
   * Nesse exemplo, a flag B possui uma prioridade maior que a flag A, desse modo, a
   * flag B possui prioridade sobre a flag A, ou seja, a flag B será utilizada para
   * definir qual versão da feature o usuário possui acesso.
   */
  console.log(res) // { available: true, version: 'DEVELOPMENT'}
}
