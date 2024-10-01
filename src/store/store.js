import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice";
import colorSlice from "./colorSlice";
import brandSlice from "./brandSlice";
import cartSlice from "./cartSlice";

export default configureStore({
  reducer: {
    products: productsSlice,
    colors: colorSlice,
    brands: brandSlice,
    cart: cartSlice,
  },
});
