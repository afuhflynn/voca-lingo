"use client";

import { authClient } from "@/lib/auth-client"; //import the auth client

// create a github signin action

export const googleSignIn = async () => {
  await authClient.signIn.social({
    /**
     * The social provider ID
     * @example "github", "google", "apple"
     */
    provider: "google",
    /**
     * A URL to redirect after the user authenticates with the provider
     * @default "/"
     */
    callbackURL: "/dashboard",
    /**
     * A URL to redirect if an error occurs during the sign in process
     */
    errorCallbackURL: "/error",
    /**
     * disable the automatic redirect to the provider.
     * @default false
     */
    disableRedirect: false,
  });

  await authClient.linkSocial({
    provider: "google", // or any other provider id
  });

  // const { data } = await authClient.getAccessToken({
  //   providerId: "google", // or any other provider id
  //   accountId: "accountId", // optional, if you want to get the access token for a specific account
  // });
  // const accessToken = data?.accessToken;
  // console.log(accessToken);
};
