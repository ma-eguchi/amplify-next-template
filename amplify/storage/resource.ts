import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'amplifyTeamDrive',
  access: (allow) => ({
    'public/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read', 'write', 'delete']),
      allow.groups(["admin"]).to(['read', 'write', 'delete']),
      allow.groups(["reader"]).to(['read']),
    ],
    'protected/*': [
      allow.authenticated.to(['read', 'write']),
    ],
  }),
});