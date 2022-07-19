import {getProductsReducer} from "./productReducer"
import {combineReducers} from "redux"

const rootReducer = combineReducers({
    getProductsData : getProductsReducer
})

export default rootReducer