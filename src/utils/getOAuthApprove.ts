interface GoogleInfo {
  client_id: string;
  redirect_uri: string;
  scope: string;
  state: string;
  response_type: string;
  nonce: string;
  flowName?: string;
  response_mode?: string;
}
const googleInfo: GoogleInfo = {
  client_id:
    process.env.GOOGLE_CLIENT_ID ||
    "191629411062-fepnoc22qk6e8hq5bv9n0mbjjb58sj0h.apps.googleusercontent.com",
  redirect_uri: `${process.env.AUTH_URL}/success`,
  scope: "email",
  state: "join",
  response_type: "id_token",
  // access_type: "offline",
  nonce: "1",
  flowName: "GeneralOAuthFlow",
};
const AppleInfo: GoogleInfo = {
  client_id: process.env.APPLE_CLIENT_SECRET || "com.changyouintl.h5sign",
  redirect_uri: `${process.env.AUTH_URL}/success`,
  scope: "email",
  state: "join",
  response_type: "code id_token",
  response_mode: "form_post",
  nonce: "1",
};

export function getOAuthApprove(
  metaHashB64: string,
  state: "approve" | "join" | "cross",
  provider?: "apple" | "google"
) {
  if (!provider) {
    console.log(provider, "provider 没有获取到值");
    return;
  }
  let links = provider === "apple" ? AppleInfo : googleInfo;
  links.nonce = metaHashB64;
  links.state = state;

  let url =
    provider === "apple"
      ? "https://appleid.apple.com/auth/authorize?"
      : "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?";
  let query = (Object.keys(links) as (keyof GoogleInfo)[])
    .map((key) => `${key}=${links[key]}`)
    .join("&");
  let link = url + query;
  console.log(link);
  // window.location.href = link;
  // return parseFloat(str);
}
