import { auth } from "@/auth";
import { SignIn } from "@/components/LoginForm/auth-components";

export default async function TestPage() {
  const session = await auth();
  if (!session?.user) return <SignIn />;
  return <div>{session.user.email}</div>;
}
