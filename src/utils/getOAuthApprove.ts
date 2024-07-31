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
  client_id: process.env.GOOGLE_CLIENT_ID || "",
  redirect_uri: "https://memecoin-game-master.vercel.app/success",
  scope: "email",
  state: "join",
  response_type: "id_token",
  // access_type: "offline",
  nonce: "1",
  flowName: "GeneralOAuthFlow",
};
const AppleInfo: GoogleInfo = {
  client_id: process.env.GOOGLE_CLIENT_ID || "",
  redirect_uri: "https://memecoin-game-master.vercel.app/success",
  scope: "email",
  state: "join",
  response_type: "code id_token",
  response_mode: "form_post",
  nonce: "1",
};
async function getAppleLogin() {
  const url =
    "https://appleid.apple.com/auth/authorize?client_id=com.changyouintl.js&redirect_uri=https://api.qwerty2.com/changyou-api-service/appleAuth/redirect&response_type=code%20id_token&state=apple&scope=email%20name&response_mode=form_post&nonce=" +
    "1";
  window.location.href = url;
}

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
  window.location.href = link;
  // return parseFloat(str);
}
