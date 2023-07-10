// //I assume you can add more "reducer" to this store. 

// export default store;

import { configureStore } from '@reduxjs/toolkit'
import authUser from './slice/authuserSlice'

export default configureStore({
    reducer: {
        userInfo: authUser,
    }
})