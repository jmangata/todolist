import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import TemplateTask from '@/components/TemplateTask'

import { styles } from './styles'
import Header from '@/components/Header'
import FormAdd from '@/components/FormAdd'
import List from '@/components/List'
import { store} from '../store/store'
import { Provider, useDispatch } from 'react-redux'
import ExempleSwipe from '@/components/ExempleSwipe'
import { ajouter } from '@/app/store/slices/taskSlice'
import Products from '@/components/ecommerce/Products'
import { GestureHandlerRootView } from 'react-native-gesture-handler'



const IndexContent = () => {
  const [showFormAdd, setShowFormAdd] = useState(false);
  const [textTache, setTextTache] = useState('');
  const dispatch = useDispatch();

  const addTodo = () => {
    if (textTache.trim() === '') return;
    
    const newTodo = {
      id: Date.now().toString(),
      title: textTache,
      completed: false,
    };
    dispatch(ajouter(newTodo));
    setTextTache('');
    setShowFormAdd(false);
  };

  return (
    <View style={styles.container}>
      <Header />
      
      <List/>
      
      {/* Formulaire flottant en bas */}
      {showFormAdd && (
        <View style={styles.floatingFormContainer}>
          <View style={styles.floatingInputContainer}>
            <TextInput
              style={styles.floatingInput}
              placeholder="Ajouter une nouvelle tâche..."
              value={textTache}
              onChangeText={setTextTache}
              onSubmitEditing={addTodo}
              autoFocus
            />
            <TouchableOpacity style={styles.floatingAddBtn} onPress={addTodo}>
              <Text style={styles.addBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      {/* Bouton flottant en bas à droite */}
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => setShowFormAdd(!showFormAdd)}
      >
        <Text style={styles.floatingButtonText}>{showFormAdd ? '×' : '+'}</Text>
      </TouchableOpacity>
    </View>
  )
};

const index = () => {
  return (
    <GestureHandlerRootView>
    <Provider store={store}>
      <Products/>
    </Provider>
    </GestureHandlerRootView>
  )
}

export default index

