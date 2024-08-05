import { signIn } from "@/auth";

export function LoginForm() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("apple");
      }}
    >
      <button type="submit">Signin with Apple</button>
    </form>
  );
}
