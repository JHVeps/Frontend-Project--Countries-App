import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import countriesReducer from './features/country/countriesSlice'

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    cart: cartReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
