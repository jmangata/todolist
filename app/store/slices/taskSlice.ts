import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a Task type for clarity
interface Task {
  id: string;
  title: string;
  completed?: boolean;
}

const initialState: Task[] = [];

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    ajouter: (state, action: PayloadAction<Task>) => {
      // add new task
      state.push(action.payload);
    },
    modifier: (state, action: PayloadAction<Task>) => {
      const idx = state.findIndex((t) => t.id === action.payload.id);
      if (idx !== -1) state[idx] = { ...state[idx], ...action.payload };
    },
    supprimer: (state, action: PayloadAction<string>) => {
      return state.filter((t) => t.id !== action.payload);
    },
  },
});

export const { ajouter, modifier, supprimer } = taskSlice.actions;
export default taskSlice.reducer;




