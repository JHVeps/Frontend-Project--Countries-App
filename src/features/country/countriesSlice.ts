import { Country } from '../../types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export interface countriesState {
  items: Country[]
  isLoading: boolean
  error: boolean
}

const initialState: countriesState = {
  items: [],
  isLoading: false,
  error: false,
}

const url =
  'https://restcountries.com/v3.1/all?fields=name,capital,currencies,languages,flags,flag,population,region,maps'

export const getCountriesThunk = createAsyncThunk(
  'countries/fetch',
  async () => {
    const res = await axios(url)
    return {
      data: res.data,
      status: res.status,
    }
  }
)

function compare(a: Country, b: Country) {
  if (a.name.common < b.name.common) {
    return -1
  }
  if (a.name.common > b.name.common) {
    return 1
  }
  return 0
}

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    handleSort: (state) => {
      const sortedItems = state.items.sort(compare)
      state.items = sortedItems
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCountriesThunk.pending, (state) => {
      state.isLoading = true
      state.error = false
    })
    builder.addCase(getCountriesThunk.fulfilled, (state, action) => {
      state.items = action.payload.data
      state.isLoading = false
      state.error = false
    })
    builder.addCase(getCountriesThunk.rejected, (state) => {
      state.isLoading = false
      state.error = true
    })
  },
})
export const { handleSort } = countriesSlice.actions
export default countriesSlice.reducer
