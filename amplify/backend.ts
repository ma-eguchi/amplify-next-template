import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { storage } from './storage/resource.js';
import { Policy, PolicyStatement } from "aws-cdk-lib/aws-iam"

const backend = defineBackend({
  auth,
  storage,
});

const { admin, reader } = backend.auth.resources.groups;
const iamPolicyStack = backend.createStack("policy-stack");
const bucketName = "kodato-browser-s3-0523";

admin.role.attachInlinePolicy(
  new Policy(iamPolicyStack, "AdminPolicy", {
    policyName: "AdminPolicy",
    statements: [
      new PolicyStatement({
        actions: ["s3:*"],
        resources: [
          `arn:aws:s3:::${bucketName}/*`,
          `arn:aws:s3:::${bucketName}`,
        ],
      }),
    ],
  })
);

reader.role.attachInlinePolicy(
  new Policy(iamPolicyStack, "ReaderPolicy", {
    policyName: "ReaderPolicy",
    statements: [
      new PolicyStatement({
        actions: ["s3:Get", "s3:List*"],
        resources: [
          `arn:aws:s3:::${bucketName}/*`,
          `arn:aws:s3:::${bucketName}`,
        ],
      }),
    ],
  })
);