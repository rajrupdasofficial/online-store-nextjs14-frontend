import { Button } from "@/components/ui/button";
import Slider from "./_components/Slider";
import GlobalApi from "@/utils/GlobalApi";
import CategoryList from "./_components/categoryList";
import ProductList from "./_components/ProductList";
import Image from "next/image";
import Footer from "./_components/Footer";

export const metadata = {
  title: "Ecommerce Application",
  description: "Ecommerce application for production",

};

export default async function Home() {
  const SliderList = await GlobalApi.getSliders();
  const categoryList = await GlobalApi.getCategoryList();
  const productList = await GlobalApi.getAllProducts();
  const footerBanner = await GlobalApi.getFooterBanner();
  return (
    <div className="p-5 md:p-10 px-16">
      {/* Slider */}
      <Slider SliderList={SliderList} />
      {/* category list */}
      <CategoryList categoryList={categoryList} />
      {/* Product list */}
      <ProductList productList={productList} />
      {/* footer banner */}
      {footerBanner.length > 0 && (
        <div>
          <Image
            src={
              footerBanner[footerBanner.length - 1]?.attributes?.images?.data[0]
                ?.attributes?.url
            }
            alt="footer banner"
            height={300}
            width={1000}
            className="w-full h-[300px] object-cover mt-10"
          />
          {/* footer */}
          <Footer />
        </div>
      )}
    </div>
  );
}
