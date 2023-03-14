import { Flag } from '../../base/flags'
import flagSystem from '../../base/implementation'

export const flagEntityExample = async (): Promise<
  Record<string, Flag[] | string | undefined>
> => {
  const flagEntityResult = await flagSystem.flagEntity(
    'user-id',
    Flag.A,
    'user',
    'insert'
  )

  return {
    flagEntityExample: flagEntityResult.res || flagEntityResult.error
  }
}
