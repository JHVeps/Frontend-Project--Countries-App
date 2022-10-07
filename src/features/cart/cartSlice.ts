import { Country } from '../../types'
import { createSlice } from '@reduxjs/toolkit'

export interface cartState {
  cartItems: Country[]
  total: number
}

const initialState: cartState = {
  cartItems: [],
  total: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
      state.total = 0
    },
    addToCart(state, action) {
      if (state.cartItems.find((p) => p.flag === action.payload.flag)) {
        return state
      }
      state.cartItems.push(action.payload)
      state.total++
      return state
    },
    removeItem: (state, action) => {
      const itemFlag = action.payload
      state.cartItems = state.cartItems.filter((item) => item.flag !== itemFlag)
      state.total--
    },
  },
})

export const { clearCart, addToCart, removeItem } = cartSlice.actions
export default cartSlice.reducer
