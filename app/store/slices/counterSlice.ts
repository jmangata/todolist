import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// initialisation du reducer compteur
interface CounterState {
	value: number;
}

const initialState: CounterState = {
	value: 0,
};

// création du reducer compteur
export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		incremente: (state) => {
			state.value += 1;
		},
		decremente: (state) => {
			state.value -= 1;
		},
		reset: (state) => {
			state.value = 0;
		},
		// example of payloaded action
		setValue: (state, action: PayloadAction<number>) => {
			state.value = action.payload;
		},
	},
});

export const { incremente, decremente, reset, setValue } = counterSlice.actions;
export default counterSlice.reducer;


