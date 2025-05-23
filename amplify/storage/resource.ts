import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
    name: 'kodato-s3-test-0523',
    access: (allow) => ({
      'public/*': [
        allow.guest.to(['read']),
        allow.authenticated.to(['read', 'write', 'delete']),
      ],
    })
  });