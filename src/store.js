import { configureStore } from "@reduxjs/toolkit";
import supplier from './store/reducer/supplier';
import manager from './store/reducer/manager';
export default configureStore({
    reducer: {supplier, manager}
})