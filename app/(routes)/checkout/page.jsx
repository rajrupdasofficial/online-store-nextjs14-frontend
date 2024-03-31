"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowBigRight } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import GlobalApi from "@/utils/GlobalApi";
import { useRouter } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Checkout = () => {
  const [userid, setUserid] = useState();
  const [jwt, setJwt] = useState();
  const [cartItemList, setCartItemList] = useState([]);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [subtotal, setSubTotal] = useState();
  const [paypalamount, setPaypalAmount] = useState();
  const router = useRouter();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [address, setAddress] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserid(user);
    }
    const jwts = localStorage.getItem("auth");
    if (jwts) {
      setJwt(jwts);
    } else {
      router.push("/signin");
    }
  }, [router]);
  const getCartItems = useCallback(async () => {
    if (userid && userid.id && jwt) {
      const cartItemList_ = await GlobalApi.getCartItems(userid.id, jwt);
      console.log(cartItemList_);
      setTotalCartItem(cartItemList_?.length);
      setCartItemList(cartItemList_);
    }
  }, [userid, jwt]);
  useEffect(() => {
    getCartItems();
  }, [getCartItems]);
  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total = total + element.amount;
    });
    const calculatedPaypalAmount = (total * 0.9).toFixed(2);
    setPaypalAmount(calculatedPaypalAmount);
    setSubTotal(total.toFixed(2));
  }, [cartItemList]);

  const calculateTotalAmount = () => {
    const totalAmount = subtotal * 0.9 + 25;

    return totalAmount.toFixed(2);
  };
  console.log(paypalamount);
  return (
    <div className="mx-10 border">
      <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">
        Chekout
      </h2>
      <div className="p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
        <div className="md:col-span-2 mx-20">
          <h2 className="font-bold text-3xl">Billing Details</h2>
          <div className="grid md:grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Name"
              name="name"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              type="text"
              placeholder="Phone"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              placeholder="Zip"
              type="text"
              name="zip"
              onChange={(e) => setZip(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <Input
              placeholder="Address"
              type="text"
              name="address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="mx-10 border">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total Cart ({totalCartItem})
          </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Subtotal : <span>${subtotal}</span>
            </h2>
            <hr />
            <h2 className="flex justify-between">
              Delivery: <span>$15.00</span>
            </h2>
            <h2 className="flex justify-between">
              Tax:<span>${(totalCartItem * 0.9).toFixed(2)}</span>
            </h2>
            <hr />
            <h2 className="font-bold flex justify-between">
              Total: <span>${calculateTotalAmount()}</span>
            </h2>
            {/* <Button>
              Payment <ArrowBigRight />
            </Button> */}
            <PayPalButtons
              style={{ layout: "horizontal" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: paypalamount,
                        currency_code: "USD",
                      },
                    },
                  ],
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
