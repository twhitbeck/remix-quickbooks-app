import { type LoaderFunction } from "remix";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const response = await fetch(process.env.TOKEN_ENDPOINT!, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/x-www-form-urlencoded",
      authorization: `Basic ${btoa(
        `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
      )}`,
    },
    body: new URLSearchParams({
      code: url.searchParams.get("code")!,
      redirect_uri: process.env.REDIRECT_URI!,
      grant_type: "authorization_code",
    }).toString(),
  });

  if (!response.ok) {
    return response;
  }

  const {
    x_refresh_token_expires_in,
    refresh_token,
    access_token,
    token_type,
    expires_in,
  }: {
    x_refresh_token_expires_in: number;
    refresh_token: string;
    access_token: string;
    token_type: "bearer";
    expires_in: number;
  } = await response.json();

  return new Response(null, {
    headers: {
      location: "/",
    },
    status: 301,
  });
};
