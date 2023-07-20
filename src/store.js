import { configureStore } from "@reduxjs/toolkit";
import supplier from './store/reducer/supplier';

export default configureStore({
    reducer: {supplier }
})