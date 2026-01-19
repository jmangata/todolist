import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Définir le type d'une tâche
export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

// Type de l'état initial
type TaskState = Task[];

// État initial
const initialState: TaskState = [];

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    ajouter: (state, action: PayloadAction<Task>) => {
      // add new task
      console.log('actions ajouter:', action.payload)
      state.push(action.payload);
    },

    modifier: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const task = state.find(item => item.id === id);
      if (task) {
        task.completed = !task.completed;
      }
    },
    
    supprimer: (state, action: PayloadAction<string>) => {
      console.log('supprimer la tache', action.payload)
      return state.filter(item => item.id !== action.payload);
    },
  },
});

export const { ajouter, modifier, supprimer } = taskSlice.actions;
export default taskSlice.reducer;




