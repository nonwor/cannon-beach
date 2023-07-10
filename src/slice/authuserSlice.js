import { createSlice } from '@reduxjs/toolkit'

export const authUser = createSlice({
    name: 'userInfo',
    initialState: {
        'uid': '',
    },
    reducers:{
        authinfo:(state, action)=>{
            console.log("calling auth")
            return {'uid': action.payload}
        },
        clearUserInfo:state=>{
            return{'uid':''}
        }
    }
})

export const {authinfo,clearUserInfo} = authUser.actions
export default authUser.reducer 