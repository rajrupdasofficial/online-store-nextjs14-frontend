import Image from "next/image";
const CategoryList = ({ categoryList }) => {
  return (
    <div>
      <h2 className="text-blue-900 font-bold text-2xl mt-7">
        Shop by category
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-5 cursor-pointer">
        {categoryList.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-blue-100 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-blue-200">
            <Image
              src={category?.attributes?.icon?.data[0]?.attributes?.url}
              width={35}
              height={35}
              alt="category list image"
              className="group-hover:scale-125 transition-all ease-in-out cursor-pointer"
            />
            <h2 className="text-blue-800">{category?.attributes?.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
