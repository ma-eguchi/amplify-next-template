"use client";

import "@aws-amplify/ui-react/styles.css";
import outputs from "@/amplify_outputs.json";
import { Authenticator, Button } from "@aws-amplify/ui-react";
import { StorageBrowser } from "@aws-amplify/ui-react-storage";
import { Amplify } from "aws-amplify";

Amplify.configure({
  ...outputs,
  storage: {
    aws_region: "ap-northeast-1",
    bucket_name: "kodato-s3-test-0524",
    buckts: [
      {
      path: {
        "public/*" : {
          groupsadmin :["read", "write", "delete"],
          groupsreader:["read"],
        },
      },
    },
  ],
},
});


export default function App() {
  return (
    <Authenticator>
      {({ signOut }) => (
        <>
          <Button onClick={signOut}>Sign Out</Button>
          <StorageBrowser />
        </>
      )}
    </Authenticator>
  );
}