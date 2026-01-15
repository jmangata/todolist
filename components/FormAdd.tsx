import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/app/(tabs)/styles'
import { useDispatch } from 'react-redux'
import { ajouter } from '@/app/store/slices/taskSlice'


const FormAdd = () => {
    // declaration de la variable 
    const [textTache, setTextTache] = useState('')
    
  const dispatch = useDispatch();

    const addTodo = () => {
    //déclaration d'une fonction pour ajouter une tache 
     
    // Formatage d'une nouvelle tache          
      const newTodo = {
              id: Date.now().toString(),
              title: textTache,
              completed: false,
            };
      dispatch(ajouter(newTodo))
      setTextTache('')
            console.log('newTodo:', newTodo)

    }//end addtodo


  return (
    <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ajouter une nouvelle tâche..."
              value={textTache}
              onChangeText={setTextTache}
              onSubmitEditing={addTodo}
            />
            <TouchableOpacity style={styles.addBtn} onPress={addTodo}>
              <Text style={styles.addBtnText}>+</Text>
            </TouchableOpacity>
          </View>
  )
}

export default FormAdd

