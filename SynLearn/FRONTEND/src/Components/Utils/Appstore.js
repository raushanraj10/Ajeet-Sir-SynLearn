import {configureStore} from "@reduxjs/toolkit"
import UserReducer from "./UserSlice"
import AdminReducer from "./AdminSlice"

const AppStore=configureStore({
    reducer:{
        userdata:UserReducer,
        admindata:AdminReducer,
    }
})

export default AppStore