import { ZimbraPlatformType } from '@/api/platform';

export const platformMock: ZimbraPlatformType[] = [
  {
    checksum: 'c6022a95d9ce258d6d534ec355bec6c9',
    currentState: {
      accountsStatistics: [],
      description: 'some description',
      name: 'Manager Team platform',
      numberOfOrganizations: 0,
      quota: 1,
    },
    currentTasks: [],
    id: '00000000-0000-0000-0000-000000000001',
    resourceStatus: 'READY',
    targetSpec: {
      description: 'some description',
      name: 'Manager Team platform',
    },
    iam: {
      id: 'ce6c1c21-565a-42c3-b1fd-53d9d09c7395',
      urn:
        'urn:v1:labeu:resource:zimbraPlatform:00000000-0000-0000-0000-000000000001',
    },
  },
];