import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Sign in | AlgoPath",
  description: "Sign in to AlgoPath and keep your interview practice moving.",
};

export default function LoginPage() {
  return <AuthForm />;
}
