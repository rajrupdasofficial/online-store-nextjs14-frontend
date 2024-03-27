"use client";
//import statement
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GlobalApi from "@/utils/GlobalApi";
import { toast } from "sonner";

//logics
const RegisterPage = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const onCreateAccount = () => {
    GlobalApi.registerUser(username, email, password).then(
      (resp) => {
        sessionStorage.setItem("intercom_user", JSON.stringify(resp.data.user));
        sessionStorage.setItem("intercom_auth", resp.data.jwt);
        localStorage.setItem("intercom_auth", resp.data.jwt);
        toast("Account created successfully");
        router.push("/signin");
      },
      (e) => {
        toast("error while creating account");
      }
    );
  };

  useEffect(() => {
    const intercom_auth = sessionStorage.getItem("intercom_auth");
    if (intercom_auth) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="flex items-baseline justify-center my-10">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border border-slate-200">
        <Image src="/logo.png" width={100} height={100} alt="registerlogo" />
        <h2 className="font-bold text-3xl">Create account</h2>
        <h2>Enter your email and password to create your account</h2>
        <div>
          <div className="flex flex-col w-full mt-7 gap-7">
            <Input
              placeholder="username"
              name="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
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
            <Button disabled={!password} onClick={() => onCreateAccount()}>
              Create an Account
            </Button>

            <p>
              Already have an account
              <Link href={"/signin"} className="text-blue-500">
                &nbsp; click here to signin
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
