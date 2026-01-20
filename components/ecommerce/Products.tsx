import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import CardProduct from './CardProduct';
import { stylesEcommerce } from './stylesEcommerce';

const Products = () => {
    // Initialisation des variables locale (state)
    const [dataProducts, setDataProducts] = useState([]) ; // tableau de la liste des produits
    const [loading , setLoading] = useState(true) ;

    // chargement des données de l'api 

    const loadData = async () => { 

        //changement état du chargement
        setLoading(true) ;

        // requete sur l'api
        const query = await axios.get("https://fakestoreapi.com/products") ;

        //  chargement des données dans la flatlist
        setDataProducts(query.data) ;

        // fin de chargement
      setTimeout(()=>{
        setLoading(false)
      },1500)


     }

   useEffect(()=>{

    loadData() ;

   },[]) // [] au chargement du composant


  return (
    <View style={stylesEcommerce.container}>
      <Text>Products</Text>


        {loading ? 
            <ActivityIndicator /> 
            :
            <FlatList 
                data={dataProducts}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item})=> <CardProduct products={item} /> }

            />
        }

    </View>
  )
}

export default Products