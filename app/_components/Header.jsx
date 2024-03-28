"use client";
import Image from "next/image";
import { LayoutGrid, Search, ShoppingBag, CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from "@/utils/GlobalApi";
import { useEffect, useState } from "react";
import Link from "next/link";
import { search } from "@/lib/search";
import { useRouter } from "next/navigation";

// logics
const Header = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [onLogin, setonLogin] = useState(false);

  const router = useRouter();
  useEffect(() => {
    getCategoryList();

    const auth = localStorage.getItem("auth");
    if (auth) {
      setonLogin(true);
    }
  }, []);
  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      setCategoryList(resp.data.data);
    });
  };

  const onLogOut = () => {
    localStorage.clear();
    router.push("/signin");
  };

  return (
    <div className="p-5 shadow-md flex justify-between">
      <div className="flex items-center gap-8">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={40} height={60} />
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className="hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 outline-none cursor-pointer">
              <LayoutGrid className="h-5 w-5 outline-none" /> Browse Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryList.map((category, index) => (
              <Link
                key={index}
                href={"/products-category/" + category.attributes.name}>
                <DropdownMenuItem className="flex gap-4 items-center cursor-pointer">
                  {category?.attributes?.icon?.data[0]?.attributes?.url && (
                    <Image
                      src={category?.attributes?.icon?.data[0]?.attributes?.url}
                      alt="icon"
                      width={30}
                      height={30}
                    />
                  )}

                  <h2 className="text-lg">{category?.attributes?.name}</h2>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="md:flex gap-3 items-center border rounded-full p-2 px-5 hidden">
          <form action={search}>
            <input
              type="text"
              placeholder="Search"
              name="search"
              className="outline-none"
            />
            <button>
              <Search />
            </button>
          </form>
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <h2 className="flex gap-2 items-center text-lg">
          <ShoppingBag />0
        </h2>
        {!onLogin ? (
          <Link href="/signin">
            <Button>Login</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserRound className="bg-blue-100 text-primary h-7 w-7 rounded-full" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>My orders</DropdownMenuItem>
              <DropdownMenuItem>
                <button className="mouse-pointer" onClick={() => onLogOut()}>
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Header;
