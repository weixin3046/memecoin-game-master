interface GoogleInfo {
  client_id: string;
  redirect_uri: string;
  scope: string;
  state: string;
  response_type: string;
  nonce: string;
  flowName: string;
}
const googleInfo: GoogleInfo = {
  client_id:
    "191629411062-fepnoc22qk6e8hq5bv9n0mbjjb58sj0h.apps.googleusercontent.com",
  redirect_uri: "https://memecoin-game-master.vercel.app/success",
  scope: "email",
  state: "join",
  response_type: "id_token",
  // access_type: "offline",
  nonce: "1",
  flowName: "GeneralOAuthFlow",
};

export function getOAuthApprove(
  metaHashB64: string,
  state: "approve" | "join" | "cross",
  provider?: "apple" | "google"
) {
  googleInfo.nonce = metaHashB64;
  googleInfo.state = state;
  let url = "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?";
  let query = (Object.keys(googleInfo) as (keyof GoogleInfo)[])
    .map((key) => `${key}=${googleInfo[key]}`)
    .join("&");
  let link = url + query;
  window.location.href = link;
  // return parseFloat(str);
}
