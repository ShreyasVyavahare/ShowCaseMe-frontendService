import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PortfolioState {
    portfolio: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: PortfolioState = {
    portfolio: null,
    loading: false,
    error: null,
};

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers:{
        setPortfolio(state, action: PayloadAction<any>) {
            state.portfolio = action.payload;
         
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },

    }
})

export const { setPortfolio, setLoading, setError } = portfolioSlice.actions;
export default portfolioSlice.reducer;
