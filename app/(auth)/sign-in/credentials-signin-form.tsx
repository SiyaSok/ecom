/** @format */
"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { signInWithCredentials } from "@/lib/actions/user.action";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, LogInIcon } from "lucide-react";

const CredentialsSignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignInButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} className='w-full' variant='default'>
        <LogInIcon className='mr-2 h-4 w-4' />
        {pending ? "Signing In..." : "Sign In"}
      </Button>
    );
  };

  return (
    <form action={action}>
      <input type='hidden' name='callbackUrl' value={callbackUrl} />
      <div className='space-y-6'>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            name='email'
            type='email'
            required
            autoComplete='email'
            defaultValue={""}
          />
        </div>
        <div className='relative'>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            name='password'
            type={passwordVisible ? "text" : "password"}
            required
            autoComplete='password'
            defaultValue={""}
          />
          <Eye
            className='absolute right-3 top-[38px] h-4 w-4 cursor-pointer text-muted-foreground'
            onClick={() => setPasswordVisible(!passwordVisible)}
          />
        </div>
        <div className='flex items-center justify-between'>
          {/* <Link href='/forgot-password' target='_self' className='link text-sm'>
            Forgot Password?
          </Link> */}
        </div>
        {data && !data.success && (
          <div className='text-center text-destructive'>{data.message}</div>
        )}
        <div>
          <SignInButton />
        </div>
        <div className='text-sm text-center text-muted-foreground'>
          Don&apos;t have an account?{" "}
          <Link href='/sign-up' target='_self' className='link'>
            Sign Up
          </Link>
          <div className='text-sm text-center text-muted-foreground mt-2'>
            <p>Demo credential:</p>
            <p>
              Email : <b>siyandasokhela@gmail.com</b>
            </p>
            <p>
              Password : <b>siyandasokhela</b>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;
