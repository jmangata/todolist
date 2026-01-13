import { View, Text, FlatList, } from 'react-native'
import React from 'react'

import ItemTasks from './ItemTasks';
import NoTask from './NoTask';
import StatTask from './StatTask';

const List = () => {
 
    const dataTasks = [];

    
  return (
    <FlatList
    data= {dataTasks}
    renderItem = {ItemTasks}
    keyExtractor = {(item) => item.id}
    ListEmptyComponent={NoTask}
    ListFooterComponent={StatTask}
    
    />
  )
}

export default List