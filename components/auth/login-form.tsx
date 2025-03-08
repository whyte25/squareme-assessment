"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "../ui/notify-utils";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const toastId = toast.loading("Logging in...", {
      duration: Infinity,
    });

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Login successful!", { id: toastId });
      router.push("/");
    }, 2000);
  };

  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      data-testid="login-form-container"
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl" data-testid="login-heading">
            Login
          </CardTitle>
          <CardDescription data-testid="login-description">
            Enter any email and password below to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="support@squareme.com"
                  required
                  data-testid="login-email"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    data-testid="forgot-password-link"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  defaultValue="required"
                  required
                  data-testid="login-password"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                data-testid="login-button"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                data-testid="login-google-button"
              >
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="underline underline-offset-4"
                data-testid="signup-link"
              >
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
