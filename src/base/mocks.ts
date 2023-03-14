import {
  FeatureInstance,
  FeatureVersion,
  FlagReturn,
  IFlags,
  InterfaceWithId,
  Priority
} from 'flag-system'
import { Feature } from './features'
import { Flag } from './flags'
import { findIndex, propEq } from 'ramda'

export const FLAGS = Object.values(Flag)
export const FEATURES = Object.values(Feature)

const flags: Array<FlagReturn<Flag, Feature>> = [
  {
    flag: Flag.A,
    priority: 1,
    features: [
      {
        feature: Feature.A,
        version: FeatureVersion.Stable
      }
    ]
  },
  {
    flag: Flag.C,
    priority: 1,
    features: [
      {
        feature: Feature.A,
        version: FeatureVersion.Development
      }
    ]
  }
]

export const mockGetFlags = (): Promise<Array<FlagReturn<Flag, Feature>>> => {
  return Promise.resolve(flags)
}

const orgFromUser: Record<string, string> = {
  'user-id': 'org-id'
}

const userInterface: Record<string, IFlags<Flag>> = {
  'user-id': {
    flags: [Flag.A],
    settings: {}
  }
}

const orgInterface: Record<string, IFlags<Flag>> = {
  'org-id': {
    flags: [Flag.B],
    settings: {
      permissive: true
    }
  }
}

export const mockGetUserInterface = (userID: string): Promise<IFlags<Flag>> => {
  return Promise.resolve(userInterface[userID])
}

export const mockGetOrganizationInterface = (
  orgId: string
): Promise<IFlags<Flag>> => {
  return Promise.resolve(orgInterface[orgId])
}

export const mockGetOrganizationInterfaceFromUserId = (
  userID: string
): Promise<IFlags<Flag>> => {
  return Promise.resolve(orgInterface[orgFromUser[userID]])
}

export const mockCreateFlag = (
  flag: Flag,
  priority: Priority,
  features: Array<FeatureInstance<Feature>>
): Promise<Flag> => {
  flags.push({
    flag,
    priority,
    features
  })
  return Promise.resolve(flag)
}

export const mockUpdateFlag = (
  flag: Flag,
  priority: Priority,
  features: Array<FeatureInstance<Feature>>
): Promise<Flag> => {
  const index = findIndex(propEq('flag', flag), flags)
  if (index > -1) {
    flags[index] = {
      flag,
      priority,
      features
    }
  }
  return Promise.resolve(flag)
}

export const mockRemoveFlag = (flag: Flag): Promise<Flag> => {
  const index = findIndex(propEq('flag', flag), flags)
  if (index > -1) {
    flags.splice(index, 1)
  }
  return Promise.resolve(Flag.A)
}

export const mockFlagUser = (
  userId: string,
  flagInterface: IFlags<Flag>
): Promise<Flag[]> => {
  userInterface[userId] = flagInterface
  return Promise.resolve(userInterface[userId].flags)
}

export const mockFlagOrganization = (
  organizationId: string,
  flagInterface: IFlags<Flag>
): Promise<Flag[]> => {
  orgInterface[organizationId] = flagInterface
  return Promise.resolve(orgInterface[organizationId].flags)
}

export const mockGetAllUsersInterfaces = (): Promise<
  Array<InterfaceWithId<IFlags<Flag>>>
> => {
  return Promise.resolve([
    {
      id: 'user-id',
      name: 'user-name',
      entity: 'user',
      interface: userInterface['user-id']
    }
  ])
}

export const mockGetAllOrganizationsInterfaces = (): Promise<
  Array<InterfaceWithId<IFlags<Flag>>>
> => {
  return Promise.resolve([
    {
      id: 'org-id',
      name: 'org-name',
      entity: 'organization',
      interface: orgInterface['org-id']
    }
  ])
}
