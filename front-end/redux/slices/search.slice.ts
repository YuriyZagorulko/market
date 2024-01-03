import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface GlobalSearchState {
  text: string
  priceFrom: number
  priceTo: number
}

const initialState: GlobalSearchState = {
  text: '',
  priceFrom: 0,
  priceTo: 100000,
}

export const searchSlice = createSlice({
    name: 'globalSearch',
    initialState,
    reducers: {
        changeSearchData: (state, action: PayloadAction<Partial<GlobalSearchState>>) => {
            return {
                ...state,
                ...action.payload,
            }
        },
        clearAllAndSearchByText: (state, action: PayloadAction<string>) => {
            return {
                ...initialState, // initial state is not mutable
                text: action.payload,
            }
        },
        clearAll: (state) => {
            return {
                ...initialState
            }
        },
        clearAllAndchangeSearchData: (state, action: PayloadAction<Partial<GlobalSearchState>>) => {
            return {
                ...initialState,
                ...action.payload,
            }
        },

    },
})

// Action creators are generated for each case reducer function
export const { changeSearchData, clearAll, clearAllAndSearchByText, clearAllAndchangeSearchData } = searchSlice.actions