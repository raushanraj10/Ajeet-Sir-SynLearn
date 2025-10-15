import {configureStore} from "@reduxjs/toolkit"
import UserReducer from "./UserSlice"

const AppStore=configureStore({
    reducer:{
        userdata:UserReducer,
    }
})

export default AppStore