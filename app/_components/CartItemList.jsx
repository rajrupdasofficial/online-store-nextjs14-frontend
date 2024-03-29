import Image from "next/image";
const CartItemList = ({ cartitemlist }) => {
  console.log("cartitem list" + cartitemlist);
  return (
    <div>
      <div>
        {cartitemlist.map((carts, index) => (
          <div key={index}>
            <Image
              src={carts.image}
              width={180}
              height={170}
              alt="cart image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItemList;
