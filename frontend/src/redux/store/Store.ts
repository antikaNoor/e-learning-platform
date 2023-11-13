import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/AuthSlice";

const store = configureStore({
    reducer: {
        user: userReducer
    },
});

export default store;











// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
// import storage from 'redux-persist/lib/storage';
// import { PERSIST, persistReducer, persistStore } from 'redux-persist';
// import authSlice from '../slices/AuthSlice';

// const reducers = combineReducers({
//     auth: authSlice,
// });

// const persistConfig = {
//     key: "root",
//     storage: storage,
//     whitelist: ["auth"],
// };

// const persistedReducer = persistReducer(persistConfig, reducers);

// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//         serializableCheck: {
//             ignoredActions: [PERSIST]
//         }
//     })
// });

// const persistor = persistStore(store);

// export { store, persistor };