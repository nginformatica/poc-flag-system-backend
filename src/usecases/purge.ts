import { Feature } from '../base/features'
import { Flag } from '../base/flags'
import flagSystem from '../base/implementation'

/**
 * NOTE: Casos de uso para o Flag System - Purge
 *
 * O purge pode ser utilizado tanto para remover uma flag quanto para remover uma
 * feature do sistema, devemos ter cuidado ao utilizar essa função pois não é
 * possível reverter a operação, contudo, existem formas tornar a operação mais
 * contra um possível erro, como por exemplo, usar a operação em safe mode, explicado
 * mais a frente.
 *
 */

/**
 * NOTE: Purge Flag
 * Para esse exemplo iremos assumir que o usuário possui a flag A associada a ele
 * e que a flag A possui:
 * - prioridade: 1
 * - features: [{ feature: Feature.A, version: FeatureVersion.Stable }]
 */
const purgeFlagExample = async () => {
  const { res: safePurge, error: safePurgeErr } = await flagSystem.purgeFlag(
    Flag.A, // flag que será removida
    /**
     * Existem 3 modos de operação para o purge:
     * @safe - remove a flag do registro de feature flag caso não exista nenhuma
     * entidade associada a ela
     * @unsafe - remove a flag do registro de feature flag ignorando qualquer
     * entidade
     * @force - remove a flag do registro de feature flag e de qualquer entidade
     */
    'safe'
  )

  /**
   * Nesse exemplo desconstruímos o retorno da função para obter o resultado e o
   * erro pois o purge em modo safe pode retornar um erro caso a flag esteja
   * associada a alguma entidade, o que é o caso desse exemplo.
   */
  console.log(safePurge) // undefined
  console.log(safePurgeErr) // "Flag from user is in use by user-name"

  const { res: unsafePurge, error: unsafePurgeErr } =
    await flagSystem.purgeFlag(Flag.A, 'unsafe')

  /**
   * Nesse exemplo, devido termos executado o purge em modo unsafe, a flag foi
   * removida do registro de feature flag, mesmo que ela estivesse associada a
   * alguma entidade.
   *
   * Nesse caso o usuário permanece com a flag associada a ele, mas ela não existe
   * mais no registro de feature flag
   */
  console.log(unsafePurge) // ['flagA']
  console.log(unsafePurgeErr) // undefined

  const { res: aforcePurge, error: forcePurgeErr } = await flagSystem.purgeFlag(
    Flag.A,
    'force'
  )

  /**
   * Nesse exemplo, devido termos executado o purge em modo force, a flag foi
   * removida do registro de feature flag e de qualquer entidade que a possuía.
   *
   * Nesse caso o usuário não possui mais a flag associada a ele.
   */
  console.log(aforcePurge) // ['flagA']
  console.log(forcePurgeErr) // undefined
}

/**
 * NOTE: Purge Feature
 * Purge feature é semelhante ao purge flag, porém, ao invés de remover uma flag
 * do sistema, ele remove uma feature do sistema.
 *
 * Para esse exemplo iremos assumir que existem 2 flags no sistema:
 * - flagA
 * - prioridade: 1
 * - features: [{ feature: Feature.A, version: FeatureVersion.Stable }]
 *
 * - flagB
 * - prioridade: 2
 * - features: [
 *    { feature: Feature.A, version: FeatureVersion.Stable },
 *    { feature: Feature.B, version: FeatureVersion.Stable }
 *  ]
 */
const purgeFeatureExample = async () => {
  const { res } = await flagSystem.purgeFeature(
    Feature.A // feature que será removida
  )

  /**
   * Não existe modo de operação para o purge feature, ele sempre irá remover a
   * feature do sistema, dependendo das flags restantes em um registro de feature
   * flag, esse registro pode ser removido ou atualizado.
   *
   * Como no exemplo, a flagA possui apenas a feature A, então ela será removida
   * do sistema, já a flagB possui a feature A e a feature B, então ela será
   * atualizada para conter apenas a feature B.
   */
  console.log(res?.removedFlags) // ['flagA']
  console.log(res?.updatedFlags) // ['flagB']
}
