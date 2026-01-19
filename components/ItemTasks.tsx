import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { modifier, supprimer, Task } from '@/app/store/slices/taskSlice';
import { styles } from '@/app/(tabs)/styles';

interface ItemTasksProps {
  task: Task;
}

const ItemTasks: React.FC<ItemTasksProps> = ({ task }) => {
  const dispatch = useDispatch();

  const toggleTodo = (id: string) => {
    dispatch(modifier(id));
  };

  const deleteTodo = (id: string) => {
    dispatch(supprimer(id));
  };

  // Bouton de suppression qui apparaît au swipe
  const renderRightActions = () => {
    return (
      <TouchableOpacity
        style={swipeStyles.deleteButton}
        onPress={() => deleteTodo(task.id)}
      >
        <Text style={swipeStyles.deleteButtonText}>Supprimer</Text>
      </TouchableOpacity>
    );
  };

  // Optionnel : Bouton à gauche pour d'autres actions
  const renderLeftActions = () => {
    return (
      <TouchableOpacity
        style={swipeStyles.archiveButton}
        onPress={() => toggleTodo(task.id)}
      >
        <Text style={swipeStyles.archiveButtonText}>
          {task.completed ? 'Annuler' : 'Terminer'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      overshootRight={false}
      overshootLeft={false}
    >
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
    </Swipeable>
  );
};

const swipeStyles = StyleSheet.create({
  deleteButton: {
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  archiveButton: {
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
  archiveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ItemTasks;