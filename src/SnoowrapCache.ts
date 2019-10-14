import Snoowrap from "snoowrap";
import { CLIENT_ID, TOKEN_LATENCY, USER_AGENT } from "./constants";

interface AppOnlyOAuthToken {
  access_token: string;
  expires_in: number; // milliseconds
  expiresOn: Date;
}

function isAppOnlyOAuthToken(object: any): object is AppOnlyOAuthToken {
  return (
    typeof object.access_token === "string" &&
    typeof object.expires_in === "number"
  );
}

let token: AppOnlyOAuthToken;
let snoowrap: Snoowrap;
let error: Error;

export const refreshSnoowrap = () => {
  if (error) {
    throw error;
  }
  if (isValid()) {
    return snoowrap;
  }
  throw refresh().catch(e => {
    error = e;
  });
};

const isValid = () =>
  snoowrap !== undefined &&
  token !== undefined &&
  token.expiresOn.getTime() - TOKEN_LATENCY > Date.now();

const refresh = async () => {
  const form = new FormData();
  form.set("grant_type", "https://oauth.reddit.com/grants/installed_client");
  form.set("device_id", "DO_NOT_TRACK_THIS_DEVICE");
  const response = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "post",
    headers: { authorization: `Basic ${btoa(CLIENT_ID + ":")}` },
    body: form
  });
  if (!response.ok) {
    throw new Error("Failed to retrieve OAuth token.");
  }
  const tokenInfo = await response.json();
  if (!isAppOnlyOAuthToken(tokenInfo)) {
    throw new Error("Received wrongly formatted OAuth token.");
  }
  token = tokenInfo;
  token.expiresOn = new Date(Date.now() + tokenInfo.expires_in * 1000);
  if (snoowrap !== undefined) {
    snoowrap.accessToken = token.access_token;
  } else {
    snoowrap = new Snoowrap({
      userAgent: USER_AGENT,
      accessToken: token.access_token
    });
  }
};
