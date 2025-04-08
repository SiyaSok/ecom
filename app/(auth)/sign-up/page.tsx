/** @format */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CredentialsSignUpForm from "./credentials-signup-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

/** @format */
export const metadata: Metadata = {
  title: "Sign Up",
};
const SignInPage = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const { callbackUrl } = await props.searchParams;

  const session = await auth();

  if (session) {
    return redirect(callbackUrl || "/");
  }

  return (
    <div className='w-full max-w-md mx-auto'>
      <Card>
        <CardHeader className='space-y-4'>
          <Link href='/' className='flex-center'>
            <Image
              src='/images/logo.svg'
              alt='logo'
              height={50}
              width={50}
              priority={true}
            />
          </Link>
          <CardTitle className='text-center'>Sign Up</CardTitle>
          <CardDescription className='text-center'>Sign up now</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <CredentialsSignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
