"use client";
import Image from "next/image";
import { LayoutGrid, Search, ShoppingBag } from "lucide-react";
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
const Header = () => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getCategoryList();
  }, []);
  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      setCategoryList(resp.data.data);
    });
  };

  return (
    categoryList && (
      <div className="p-5 shadow-md flex justify-between">
        <div className="flex items-center gap-8">
          <Image src="/logo.png" alt="logo" width={40} height={60} />

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
                <DropdownMenuItem key={category.attributes?.name}>
                  {category?.attributes?.icon?.data[0]?.attributes?.url && ( // Add conditional rendering
                    <Image
                      src={category?.attributes?.icon?.data[0]?.attributes?.url}
                      alt="icon"
                      width={20}
                      height={20}
                      unoptimized={true}
                    />
                  )}
                  <h2 className="ml-2">{category?.attributes?.name}</h2>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="md:flex gap-3 items-center border rounded-full p-2 px-5 hidden">
            <Search />
            <input
              type="text"
              placeholder="Search"
              name="search"
              className="outline-none"
            />
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <h2 className="flex gap-2 items-center text-lg">
            <ShoppingBag />0
          </h2>
          <Button>Login</Button>
        </div>
      </div>
    )
  );
};

export default Header;
