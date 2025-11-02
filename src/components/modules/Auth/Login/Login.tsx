"use client";

import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import Password from "@/components/Password";
import Link from "next/link";
import loginUser from "@/utility/login";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FieldValues) => {
    try {
      setIsLoading(true);
      const result = await loginUser(values.email, values.password);
      console.log(result);

      if (result?.success) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center from-background to-muted px-4 transition-colors">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-xl p-8 transition-colors">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-foreground mb-1">
            <Link href="/" className="hover:text-primary transition-colors">
              PH Health Care
            </Link>
          </h1>
          <p className="text-muted-foreground text-sm">
            Sign in to access your healthcare dashboard
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="focus-visible:ring-1 focus-visible:ring-primary transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full font-medium py-2.5 rounded-lg transition-all"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-primary hover:underline font-medium"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
}
