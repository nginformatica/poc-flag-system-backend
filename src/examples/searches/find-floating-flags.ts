import { Flag } from '../../base/flags'
import flagSystem from '../../base/implementation'
import { FLAGS } from '../../base/mocks'

export const findFloatingFlagsExample = async (): Promise<
  Record<string, Flag[] | string | undefined>
> => {
  const findFloatingFlags = await flagSystem.findFloatingFlags(FLAGS)

  return {
    findFloatingFlagsExample: findFloatingFlags.res || findFloatingFlags.error
  }
}
