import ProductItem from "./ProductItem";

const ProductList = ({ productList }) => {
  return (
    <div>
      <h2 className="text-blue-900 font-bold text-2xl mt-7">
        Our Latest Product
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {productList.map((product, index) => (
          <div key={index}>
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
