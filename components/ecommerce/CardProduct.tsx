import { StyleSheet, Text, View, Image, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { stylesEcommerce } from './stylesEcommerce'
import { useNavigation } from '@react-navigation/native'

const CardProduct = ({products}) => {

const navigation = useNavigation()

  const title = products?.title ?? ''
  const shortTitle = title.length > 20 ? title.slice(0, 20) + '...' : title
  
  const goToProduct = () => {
    console.log('goToProduct')
    navigation.navigate('modal',{products})
    
  }
  return (
    
    <TouchableOpacity
    onPress={goToProduct}
     style={stylesEcommerce.containerCard}>
      <Image 
      source={{uri: products.image}}
      style={stylesEcommerce.imgCard}
      />
      <View style={stylesEcommerce.mainCard}>
      <Text>{shortTitle}</Text>
      <Text>{products.price} $</Text>

      </View>

      </TouchableOpacity>
  )
}

export default CardProduct

const styles = StyleSheet.create({})