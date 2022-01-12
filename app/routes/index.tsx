import { type LoaderFunction } from "remix";

import { useLoaderData } from "@remix-run/react";

interface LoaderData {
  clientId: string;
  redirectUri: string;
  authorizationEndpoint: string;
}

export let loader: LoaderFunction = () => {
  const data: LoaderData = {
    clientId: process.env.CLIENT_ID!,
    redirectUri: process.env.REDIRECT_URI!,
    authorizationEndpoint: process.env.AUTHORIZATION_ENDPOINT!,
  };

  return data;
};

export default function Index() {
  const { clientId, redirectUri, authorizationEndpoint } =
    useLoaderData<LoaderData>();

  return (
    <div>
      <a
        href={`${authorizationEndpoint}?${new URLSearchParams({
          client_id: clientId,
          scope: ["com.intuit.quickbooks.accounting"].join(" "),
          redirect_uri: redirectUri,
          response_type: "code",
          state: "foo",
        })}`}
      >
        Connect to quickbooks
      </a>
    </div>
  );
}
