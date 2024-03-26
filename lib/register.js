"use server";

import GlobalApi from "@/utils/GlobalApi";

export const register = async (previousState, formData) => {
  const { username, email, password } = Object.fromEntries(formData);
  GlobalApi.registerUser(username, email, password);
};
