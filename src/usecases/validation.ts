import { Feature } from '../base/features'
import flagSystem from '../base/implementation'

/**
 * NOTE: Casos de uso para o Flag System - Validação de acesso a feature
 *
 * Uma vez implementado, o Flag System pode ser utilizado de diversas formas, no
 * ponto de vista do client, ou seja, do frontend, o único caso de uso seria a
 * própria validação de acesso a uma feature, por exemplo:
 *
 * const flagSystem = new FlagSystem(...)
 * const hasAccess = flagSystem.canUserAccessFeature('user-id', Feature.A)
 *
 * Os demais casos de uso são para o backend, ficando a cargo do desenvolvedor
 * implementar os métodos disponíveis no Flag System de acordo com a necessidade.
 *
 * Os métodos disponibilizados pela lib sao todos encapsulados em um objeto contendo
 * res, error e debug (caso o debug esteja habilitado)
 *
 * @res - resultado da operação
 * @error - possível mensagem de erro caso alguma exceção seja lançada
 * @debug - informações adicionais para depuração
 *
 * Não sera abordado aqui informações mais triviais, como por exemplo, a declaração
 * da classe, podem ser encontrados no arquivo src/base/implementation.ts
 * e nos arquivos de testes localizados em src/examples
 *
 * OBS: Importante ressaltar que os exemplos abaixo são apenas para fins de
 * demonstração, não devem ser utilizados em produção
 */

/**
 * Para o exemplo iremos assumir que o usuário possui acesso a feature A mas não
 * possui acesso a feature B
 */
const canUserAccessFeatureExample = async () => {
  const { res: resFeatureA, error: errFeatureA } =
    await flagSystem.canUserAccessFeature('user-id', Feature.A)

  const { res: resFeatureB, error: errFeatureB } =
    await flagSystem.canUserAccessFeature('user-id', Feature.B)

  /**
   * Caso ocorra algum erro, lançamos uma exceção
   *
   * Importante ressaltar que o Flag System não lança exceções, apenas retorna
   * um objeto contendo o erro caso ocorra
   */
  if (errFeatureA || !resFeatureA) {
    throw new Error(errFeatureA)
  }

  if (errFeatureB || !resFeatureB) {
    throw new Error(errFeatureB)
  }

  /**
   * resFeatureA.available = true
   * resFeatureB.available = false
   *
   * Nesse exemplo levamos em consideração apenas o fato do usuário ter acesso ou não
   * a feature.
   */
}

/**
 * É possível também validar se o usuário possui acesso a uma feature
 * em uma determinada versão.
 *
 * Considere para o exemplo abaixo que o usuário possui acesso a feature A na versão
 * estável e feature B na versão de desenvolvimento
 */
const canUserAccessFeatureVersionExample = async (): Promise<void> => {
  const { res: resFeatureA, error: errFeatureA } =
    await flagSystem.canUserAccessFeature('user-id', Feature.A)

  const { res: resFeatureB, error: errFeatureB } =
    await flagSystem.canUserAccessFeature('user-id', Feature.B)

  if (errFeatureA || !resFeatureA) {
    throw new Error(errFeatureA)
  }

  if (errFeatureB || !resFeatureB) {
    throw new Error(errFeatureB)
  }

  /**
   * O return do método canUserAccessFeatureVersion é um objeto contendo
   * dois atributos: available e version, anteriormente utilizamos apenas
   * o atributo available, agora validaremos também a versão
   *
   * resFeatureA.available = true
   * resFeatureA.version = 'STABLE'
   *
   * resFeatureB.available = true
   * resFeatureB.version = 'DEVELOPMENT'
   *
   * NOTE: Caso o usuário não possua acesso a feature, o atributo version sera
   * retornado como 'NOT_AVAILABLE'
   */
}
