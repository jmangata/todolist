import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TemplateTask from '@/components/TemplateTask'

import { styles } from './styles'
import Header from '@/components/Header'
import FormAdd from '@/components/FormAdd'
const index = () => {
  return (
    <View style={styles.container}>
      <Header />
      <FormAdd/>
      <TemplateTask/>
    </View>
  )
}

export default index

