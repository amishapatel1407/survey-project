import RootReducer from "./RootReducer";
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist' 
import storage from 'redux-persist/lib/storage'
const persistConfig = { 
    key: 'root',
    storage
}


const persistedReducer = persistReducer(persistConfig, RootReducer)
const store = createStore(persistedReducer,applyMiddleware(thunk))
// localStorage.clear()    
storage.removeItem('persist:root')                    
export  const  persistor = persistStore(store)
// store.getState()
export  default store   