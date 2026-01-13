import {  Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/app/(tabs)/styles'

const FormAdd = () => {
    // declaration de la variable 
    const [textTache, setTextTache] = useState('')
    
    const addTodo = () => {
    //déclaration d'une fonction pour ajouter une tache 
    console.log("textTache")

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

