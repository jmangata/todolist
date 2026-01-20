import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { stylesEcommerce } from './stylesEcommerce';
import { useLocalSearchParams } from 'expo-router';

const ShowProduct = () => {
    const [Products, setProducts] = useState() ;
    const [loading , setLoading] = useState(true) ;

    const {productId}= useLocalSearchParams()
    
    
    // chargement des données de l'api 

    const loadData = async () => { 

        
        setLoading(true) ;

       console.log('Donnée reçues de l\'API', productId)
        const query = await axios.get("https://fakestoreapi.com/products/${productId}") ;
        console.log('Donnée reçues de l\'API', query.data)
    
        setProducts(query.data) ;

        // fin de chargement
      setTimeout(()=>{
        setLoading(false)
      },1500)


     }
    

 useEffect(()=>{

    loadData() ;

   },[])






  return (

//     <View style= {stylesEcommerce.container}>
       
//     <View 
//      data={dataProducts}
//      keyExtractor={(item) => item.id.toString()}
//      renderItem={({item})=> <CardProduct products={item}>

//     </View> 

// }

// </View>
    

)
}

export default ShowProduct