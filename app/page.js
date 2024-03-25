import { Button } from "@/components/ui/button";
import Slider from "./_components/Slider";
import GlobalApi from "@/utils/GlobalApi";
import CategoryList from "./_components/categoryList";
import ProductList from "./_components/ProductList";

export default async function Home() {
  const SliderList = await GlobalApi.getSliders();
  const categoryList = await GlobalApi.getCategoryList();
  const productList = await GlobalApi.getAllProducts();

  return (
    <div className="p-5 md:p-10 px-16">
      {/* Slider */}
      <Slider SliderList={SliderList} />
      {/* category list */}
      <CategoryList categoryList={categoryList} />
      {/* Product list */}
      <ProductList productList={productList} />
    </div>
  );
}
