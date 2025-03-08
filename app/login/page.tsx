import { AuthContainer } from "@/components/auth/auth-container";
import { LoginForm } from "@/components/auth/login-form";

export default function Page() {
  return (
    <AuthContainer>
      <LoginForm />
    </AuthContainer>
  );
}
