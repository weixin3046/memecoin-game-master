// hooks/useToken.ts
import { cookies } from "next/headers";

const useToken = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (token) {
    return true;
  } else {
    return false;
  }
};

export default useToken;
