import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { storage } from './storage/resource'; 
import { Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";

const backend = defineBackend({
  auth,
  storage,
});

const { admin, user } = backend.auth.resources.groups;
const iamPolicyStack = backend.createStack("policy-stack");
const bucketName = "storage-browser-test-0523";

admin.role.attachInlinePolicy(
  new Policy(iamPolicyStack, "AdminPolicy,"{
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
  }),
);

user.role.attachInlinePolicy(
  new Policy(iamPolicyStack, "UserPolicy,"{
    policyName: "UserPolicy",
    statements: [
      new PolicyStatement({
        actions: ["s3:Get*", "s3:List*"],
        resources: [
          `arn:aws:s3:::${bucketName}/*`,
          `arn:aws:s3:::${bucketName}`,
        ],
      }),
    ],
  }),
);
