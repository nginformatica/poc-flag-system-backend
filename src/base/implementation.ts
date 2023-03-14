import { FlagSystem } from 'flag-system'
import {
  mockCreateFlag,
  mockFlagOrganization,
  mockFlagUser,
  mockGetAllOrganizationsInterfaces,
  mockGetAllUsersInterfaces,
  mockGetFlags,
  mockGetOrganizationInterface,
  mockGetOrganizationInterfaceFromUserId,
  mockGetUserInterface,
  mockRemoveFlag,
  mockUpdateFlag
} from './mocks'

/**
 * Implementação básica do FlagSystem
 *
 * Para uso completo de todas as funcionalidades do FlagSystem, devera fornecer todos
 * os callbacks do sistema.
 *
 * Existem casos em que não é necessário fornecer todos os callbacks, operações como
 * `findFloatingFlags` não necessitam de callbacks além da obrigatória `getFlags`.
 *
 * Para mais informações sobre os callbacks, consulte a documentação do FlagSystem.
 * @link https://flag-system.ngi.com.br/stable/interfaces/Types.FlagSysCallbacks.html
 */
export default new FlagSystem({
  cb: {
    getFlags: mockGetFlags,
    getUserInterface: mockGetUserInterface,
    getOrganizationInterface: mockGetOrganizationInterface,
    getOrganizationInterfaceFromUserId: mockGetOrganizationInterfaceFromUserId,
    createFlag: mockCreateFlag,
    updateFlag: mockUpdateFlag,
    removeFlag: mockRemoveFlag,
    flagUser: mockFlagUser,
    flagOrganization: mockFlagOrganization,
    getAllUsersInterfaces: mockGetAllUsersInterfaces,
    getAllOrganizationsInterfaces: mockGetAllOrganizationsInterfaces
  }
})
