import Link from "next/link";
import Image from "next/image";
import GlobalApi from "@/utils/GlobalApi";
const TopCategoryList = async ({ categoryList, selectedCategory }) => {
  const productList = await GlobalApi.getProductsByCategory(
    categoryList.categoryName
  );
  return (
    <div className="flex gap-5 mt-5 cursor-pointer overflow-auto mx-7 md:mx-20 justify-center">
      {categoryList.map((category, index) => (
        <Link
          href={"/products-category/" + category.attributes.name}
          key={index}>
          <div
            className={`flex flex-col items-center bg-blue-100 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-blue-200 w-[150px] min-w-[100px] ${
              selectedCategory == category.attributes.name &&
              "bg-blue-600 text-white"
            }`}>
            <Image
              src={category?.attributes?.icon?.data[0]?.attributes?.url}
              width={35}
              height={35}
              alt="category list image"
              className="group-hover:scale-125 transition-all ease-in-out cursor-pointer"
            />
            <h2
              className={`${
                selectedCategory == category.attributes.name &&
                "text-white text-bold"
              }`}>
              {category?.attributes?.name}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TopCategoryList;
