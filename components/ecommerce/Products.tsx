import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { stylesEcommerce } from './stylesEcommerce'
import CardProduct from './CardProduct'
import axios from 'axios'


const Products = () => {
  //initialisation des variable locale (state)

  // tableau de la liste des produits
  const [dataProducts, setDataProducts] = useState([])
  const [loading, setLoading] = useState(true)
// chargement des données dans l'api

const loadData = async () => {
//lecture a de l'API
setLoading(true)

//changement etat de chargement 
const query = await axios.get("https://fakestoreapi.com/products")
//chargement des données dans la flatlist 

setDataProducts(query.data)
//fin de changement 
setLoading(false)

}

useEffect(() => {
  loadData()
},[]) // au chargement du composant fais moi loaddata
  return (
    <View style={stylesEcommerce.container}>
      <Text>Products</Text>
      {loading ? <ActivityIndicator /> :

        <FlatList
          data={dataProducts}
          numColumns={2}
          keyExtractor={(item) => item.id()}
          renderItem={({ item }) => <CardProduct /> }

          
        />}
    </View>
  )
}

export default Products

const styles = StyleSheet.create({})