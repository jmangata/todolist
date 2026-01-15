import { View, Text, FlatList, } from 'react-native'
import React from 'react'

import ItemTasks from './ItemTasks';
import NoTask from './NoTask';
import StatTask from './StatTask';
import { useSelector } from 'react-redux';

const List = () => {
 //lecture de la liste le store 
    const dataTasks = useSelector((state)=>state.task);

    
  return (
    <FlatList
    data= {dataTasks}
    renderItem = {({item})=><ItemTasks task={item}/>}   
     keyExtractor = {(item) => item.id}
    ListEmptyComponent={NoTask}
    ListFooterComponent={StatTask}
    
    />
  )
}

export default List