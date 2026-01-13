import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { styles } from '@/app/(tabs)/styles'

type Todo = {
  id?: string
  text?: string
  completed: boolean
}

type RootState = {
  task: Todo[]
}

const StatTask: React.FC = () => {
  const todos = useSelector((state) => state.task)
  console.log("todos", todos)

  return (
    <View>
      {todos && todos.length > 0 && (
        <Text style={styles.counter}>
          {todos.filter((t: Todo) => !t.completed).length} tâche(s) restante(s)
        </Text>
      )}
    </View>
  )
}

export default StatTask

