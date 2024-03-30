"use state";
import Image from "next/image";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
const CartItemList = ({ cartitemlist, onDeleteItem }) => {
  return (
    <>
      <div className="flex flex-wrap justify-between overflow-auto">
        {cartitemlist.map((carts, index) => (
          <div
            key={index}
            className="flex justify-between items-center gap-5 mb-6">
            <div className="flex items-center">
              <Image
                src={carts.image}
                width={180}
                height={170}
                alt="cart image"
                className="border p-2 h-[200px] w-[200px]"
              />
              <div className="ml-4">
                <h2 className="font-bold">{carts.name}</h2>
                <h2>Quantity {carts.quantity}</h2>
                <h2 className="text-lg font-bold">${carts.amount}</h2>
              </div>
            </div>
            <TrashIcon
              onClick={() => onDeleteItem(carts.id)}
              className="cursor-pointer"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default CartItemList;
