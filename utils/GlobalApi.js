const { default: axios } = require("axios");

const devurl = "http://localhost:1337/api";
const baseurl =
  process.env.NEXT_PUBLIC_STATUS === ""
    ? devurl
    : process.env.NEXT_PUBLIC_BACKED_URL;

const axiosClient = axios.create({
  baseURL: baseurl,
  headers: {
    "Cache-Control": "no-cache",
  },
});

const getCategory = () => axiosClient.get("/categories?populate=*");

const getSliders = () =>
  axiosClient.get("/sliders?populate=*").then((resp) => resp.data.data);
const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((resp) => {
    return resp.data.data;
  });

const getAllProducts = () =>
  axiosClient.get("/products?populate=*").then((resp) => resp.data.data);
const getFooterBanner = () =>
  axiosClient.get("/footer-banners?populate=*").then((resp) => resp.data.data);

const getProductsByCategory = (category) =>
  axiosClient
    .get("/products?filters[categories][name][$in]=" + category + "&populate=*")
    .then((resp) => resp.data.data);
const registerUser = (username, email, password) =>
  axiosClient.post("/auth/local/register", {
    username: username,
    email: email,
    password: password,
  });

const SignIn = (email, password) =>
  axiosClient.post("/auth/local/", {
    identifier: email,
    password: password,
  });
const addToCart = (data, jwt) =>
  axiosClient.post("/user-carts", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getCartItems = (userId, jwt) =>
  axiosClient
    .get(
      "/user-carts?filters[userId][$eq]=" +
        userId +
        "&[populate][products][populate][images][populate][0]=url",
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    )
    .then((resp) => {
      const data = resp.data.data;
      const cartItemList = data.map((item, index) => ({
        name: item.attributes.products?.data[0].attributes.name,
        quantity: item.attributes.quantity,
        amount: item.attributes.amount,
        image:
          item.attributes.products?.data[0].attributes.images.data[0].attributes
            .url,
        actualPrice: item.attributes.products?.data[0].attributes.mrp,
        id: item.id,
      }));

      return cartItemList;
    });
const deleteCartItem = (id, jwt) =>
  axiosClient.delete("/user-carts/" + id, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

export default {
  getCategory,
  getSliders,
  getCategoryList,
  getAllProducts,
  getFooterBanner,
  getProductsByCategory,
  registerUser,
  SignIn,
  addToCart,
  getCartItems,
  deleteCartItem,
};
