import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'kodato-storagebrowser-test-0522',
  access: (allow) => ({
    'doc/*': [
      allow.authenticated.to(['read','write', 'delete']),
      allow.guest.to(['read'])
    ],
  })
});