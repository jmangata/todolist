import { StyleSheet, Text, View} from 'react-native'
import React from 'react'
import TemplateTask from '@/components/TemplateTask'

import { styles } from './styles'
import Header from '@/components/Header'
import FormAdd from '@/components/FormAdd'
import List from '@/components/List'
import { store} from '../store/store'
import { Provider } from 'react-redux'



const index = () => {
  return (
    <Provider store={store}>
    <View style={styles.container}>
      <Header />
      <FormAdd/>
      <List/>
    </View>
    </Provider>
  )
}

export default index

