 import { createSlice } from '@reduxjs/toolkit';

export const taskSlice = ({
    name: 'task',
    initialState: [],
     reducers: {
   ajouter: (state) => {
    console.log("votre tache a été ajouter")    
   },   
   modifier: (state) => {
    console.log("votre tache a été modifier")    
   },   
   supprimer: (state) => {
    console.log("votre tache a été supprimer")    
   },
}


})
export const {ajouter,modifier,supprimer} = taskSlice.actions;
export default taskSlice; 




