import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IGlobalSearchState {
  text: string
  priceFrom: number
  priceTo: number
  pagination: {
    currentPage: number
    totalItemsOnPage: number
    numPages: number
  }
}

const initialState: IGlobalSearchState = {
  text: '',
  priceFrom: 0,
  priceTo: 100000,
  pagination: {
    currentPage: 1,
    totalItemsOnPage: 20,
    numPages: 2,
  }
}

export const searchSlice = createSlice({
    name: 'globalSearch',
    initialState,
    reducers: {
        changeSearchData: (state, action: PayloadAction<Partial<IGlobalSearchState>>) => {
            return {
                ...state,
                ...action.payload,
                text: action.payload.text,
                priceFrom: action.payload.priceFrom,
                priceTo: action.payload.priceTo,
                pagination: action.payload.pagination,
            }
        },
        clearAllAndSearchByText: (state, action: PayloadAction<string>) => {
            return {
                ...initialState, // initial state is not mutable
                text: action.payload,
            }
        },
        setSearchText: (state, action: PayloadAction<string>) => {
            return {
                ...state, // initial state is not mutable
                text: action.payload,
            }
        },
        clearAll: (state) => {
            return {
                ...initialState
            }
        },
        clearAllAndchangeSearchData: (state, action: PayloadAction<Partial<IGlobalSearchState>>) => {
            return {
                ...initialState,
                ...action.payload,
            }
        },
        setSearchPageNumber: (state, action: PayloadAction<Partial<number>>) => {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: action.payload,
                } 
            }
        },

    },
})

// Action creators are generated for each case reducer function
export const { changeSearchData, clearAll, clearAllAndSearchByText, clearAllAndchangeSearchData, setSearchPageNumber, setSearchText
    } = searchSlice.actions