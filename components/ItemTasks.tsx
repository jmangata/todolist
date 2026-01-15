import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/app/(tabs)/styles'
import { useDispatch } from 'react-redux'
import { modifier, supprimer } from '@/app/store/slices/taskSlice'

const ItemTasks = ({ task }) => {

  const dispatch = useDispatch() //pour ecrire dans le store

  const toggleTodo = (id) => {
    
    dispatch(modifier(id))
    
    

  }
  const deleteTodo = (id) => {
    dispatch(supprimer(id)) // supprimer la tache id dans le store
    console.log(id)

  }
  return (
    <View style={styles.todoItem}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => toggleTodo(task.id)}
      >
        <View
          style={[
            styles.checkboxInner,
            task.completed && styles.checkboxChecked,
          ]}
        >
          {task.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      <Text
        style={[
          styles.todoText,
          task.completed && styles.todoTextCompleted,
        ]}
      >
        {task.title}
      </Text>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => deleteTodo(task.id)}
      >
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ItemTasks