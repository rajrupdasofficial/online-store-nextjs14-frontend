import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowBigRight } from "lucide-react";
const Checkout = () => {
  return (
    <div className="">
      <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">
        Chekout
      </h2>
      <div className="p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
        <div className="md:col-span-2 mx-20">
          <h2 className="font-bold text-3xl">Billing Details</h2>
          <div className="grid md:grid-cols-2 gap-10 mt-3">
            <Input placeholder="Name" name="name" type="text" />
            <Input placeholder="Email" name="email" type="email" />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input type="text" placeholder="Phone" name="phone" />
            <Input placeholder="Zip" type="text" name="zip" />
          </div>
          <div className="mt-3">
            <Input placeholder="Address" type="text" name="address" />
          </div>
        </div>

        <div className="mx-10 border">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total Cart (03)
          </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Subtotal : <span>$250:00</span>
            </h2>
            <hr />
            <h2 className="flex justify-between">
              Delivery: <span>$15:00</span>
            </h2>
            <h2 className="flex justify-between">
              Tax(9%):<span>$250:00</span>
            </h2>
            <hr />
            <h2 className="font-bold flex justify-between">
              Total: <span>$350:00</span>
            </h2>
            <Button>
              Payment <ArrowBigRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
