import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export const taskSlice = createSlice({
  name: 'task',
  initialState:[],
  reducers: {
    ajouter: (state, actions) => {
      // add new task
      console.log('actions ajouter:', actions.payload)
      const newState = [...state, actions.payload]
      return newState
      
    },

    modifier: (state, actions ) => {
    
    const id = actions.payload
    console.log()

    return state.map((item) =>
                        item.id === id ? { ...item, completed: !item.completed } : item
                    )
                    
    },
    supprimer: (state, actions) => {
      console.log('supprimer la tache', actions.payload)
      const newState = state.filter(item=>item.id != actions.payload) 
      return newState;
    },
  },
});

export const { ajouter, modifier, supprimer } = taskSlice.actions;
export default taskSlice.reducer;




