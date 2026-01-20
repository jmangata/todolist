import { Dimensions, StyleSheet } from "react-native"


const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 20 - 60) / 2;


export const stylesEcommerce = StyleSheet.create(

{
 container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingTop: 40,
  },
containerCard: {
  backgroundColor: '#ccc',
  margin: 10,
  padding:5,
  borderRadius:5,
  width:cardWidth,
},
imgCard:{
  width:cardWidth, 
  height: 450,
  borderTopLeftRadius:56,
  borderTopRightRadius:56,
  borderTopEndRadius: 56,


},

mainCard:{
  padding : 10



},
containere:{
  flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingTop: 40,

}







})