"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlobalApi from "@/utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SigninPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  useEffect(() => {
    const intercom_auth = sessionStorage.getItem("intercom_auth");
    if (intercom_auth) {
      router.push("/");
    }
  }, [router]);

  const onSignIn = () => {
    GlobalApi.SignIn(email, password).then(
      (resp) => {
        sessionStorage.setItem("intercom_user", JSON.stringify(resp.data.user));
        sessionStorage.setItem("intercom_auth", resp.data.jwt);
        localStorage.setItem("intercom_auth", resp.data.jwt);
        toast("Welcome back again");
        router.push("/");
      },
      (e) => {
        console.log("Something went wrong at backend please try later", e);
      }
    );
  };

  return (
    <div className="flex items-baseline justify-center my-10">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border border-slate-200">
        <Image src="/logo.png" width={100} height={100} alt="registerlogo" />
        <h2 className="font-bold text-3xl">Signin account</h2>
        <h2>Enter your email and password to Signin to your account</h2>
        <div>
          <div className="flex flex-col w-full mt-7 gap-7">
            <Input
              placeholder="name@example.com"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button disabled={!password} onClick={() => onSignIn()}>
              Signin
            </Button>

            <p>
              New user -
              <Link href={"/register"} className="text-blue-500">
                &nbsp; Register and continue shopping
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
