"use server";
export const search = async (formData) => {
  const searchData = Object.fromEntries(formData);
  console.log(searchData);
};
