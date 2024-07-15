import { requestCode } from "@/app/api/auth/requestcode/server";
import { handleLogin } from "@/app/api/auth/signIn/server";

export default async function LoginV2Page() {
  // requestCode
  const revenue = await requestCode("17610683751");
  console.log(revenue, "revenue getcode");
  return (
    <div>
      <form action={handleLogin}>
        <input
          type="number"
          name="phoneNumber"
          placeholder="phoneNumber"
          required
        />
        <input
          type="number"
          name="verificationCode"
          placeholder="verificationCode"
          required
        />
        {/* <input
          type="password"
          name="password"
          placeholder="Password"
          required
        /> */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
