import { Button } from "@/components/ui/button";
import Image from "next/image";
const ProductItem = ({ product }) => {
  return (
    <div className="p-2 md:p-5 flex flex-col items-center justify-center gap-3 border rounded-lg">
      <Image
        src={product?.attributes?.images?.data[0]?.attributes?.url}
        alt={product?.attributes.name}
        height={200}
        width={500}
        className="h-[200px] w-[200px] object-contain"
      />
      <h2 className="font-bold text-lg">{product?.attributes.name}</h2>
      <h2 className="font-bold">RS{product.attributes.mrp}</h2>
      <Button
        variant="outline"
        className="text-primary hover:text-white hover:bg-primary">
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductItem;
