"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { register } from "@/lib/register";
import GlobalApi from "@/utils/GlobalApi";
const RegisterPage = () => {
  const [state, formAction] = useFormState(register, undefined);

  console.log(state);
  // const router = useRouter();
  // // useEffect(() => {
  // //   state?.success && router.push("/signin");
  // // }, [state?.success, router]);
  return (
    <div className="flex items-baseline justify-center my-10">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border border-slate-200">
        <Image src="/logo.png" width={100} height={100} alt="registerlogo" />
        <h2 className="font-bold text-3xl">Create account</h2>
        <h2>Enter your email and password to create your account</h2>
        <div>
          <form action={formAction} className="flex flex-col w-full mt-7 gap-7">
            <Input placeholder="username" name="username" type="text" />
            <Input placeholder="name@example.com" name="email" type="email" />
            <Input placeholder="password" name="password" type="password" />
            <Button>Create an Account</Button>
            {/* <span>{state?.error}</span> */}
            <p>
              Already have an account
              <Link href={"/signin"} className="text-blue-500">
                click here to signin
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
