import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload)
            state.total += action.payload.price * action.payload.quantity
            state.quantity = Number(state.products.map(pizza => pizza.quantity).reduce((a,b) => a + b, 0))
        },
        reset: (state) => {
            state.products = []
            state.total = 0
            state.quantity = 0
        }
    }
})

export const {addProduct, reset} = cartSlice.actions
export default cartSlice.reducer