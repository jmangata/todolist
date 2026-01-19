import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/app/(tabs)/styles'
import { useDispatch } from 'react-redux'
import { modifier, supprimer } from '@/app/store/slices/taskSlice'
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const ItemTasks = ({ task }) => {

  const dispatch = useDispatch() //pour ecrire dans le store

  const toggleTodo = (id) => {

    dispatch(modifier(id))



  }
  const deleteTodo = (id) => {
    dispatch(supprimer(id)) // supprimer la tache id dans le store
    console.log(id)

  }
  const RightAction = () => {
    return (
      <View style={styles.rightAction}> 
    <TouchableOpacity
      style={styles.deleteBtn}
      onPress={() => deleteTodo(task.id)}
    >
      <Text style={styles.deleteText}>✕</Text>
    </TouchableOpacity>
  
    




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
     </View>
    
    )
  }
 
  return (
    <ReanimatedSwipeable
      containerStyle={styles.todoItem}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      leftThreshold={40}
      renderRightActions={RightAction}
      >
      <View style={styles.todoItem}>


        <Text
          style={[
            styles.todoText,
            task.completed && styles.todoTextCompleted,
          ]}
        >
          {task.title}
        </Text>


      </View>
    </ReanimatedSwipeable>
  )
}

export default ItemTasks