import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '@/app/(tabs)/styles'

const NoTask = () => {
  return (
    <Text style={styles.emptyText}>Aucune tâche pour le moment</Text>
  )
}

export default NoTask