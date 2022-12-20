import { View, Text, Button, Image, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { useState, useEffect ,useContext} from 'react'
import { useNavigation } from '@react-navigation/native'
import StudentContext from './context/context'

const HomeScreen = () => {
  const[enteredEmail,setEnteredEmail] = useState("");
  const[enteredPassword,setEnteredPassword] = useState("");

  const navigation = useNavigation();
  const ctx=useContext(StudentContext);
  
  const clearInput = () => {
    setEnteredEmail("")
    setEnteredPassword("")
  }

  const login = () => {
    console.log("DONE", enteredEmail, enteredPassword);

    fetch( "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD5VICDC5XAaVzhrTJuWOgmCiElqTcnQlc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
      }
    )
    .then(response=>{

        return response.json()
    }
    )
    .then((response)=> {
          clearInput()
          if(response.error){
            console.log("ERROR: ", response)
            return;
          }
          console.log(JSON.stringify(response));
          if(response){
            if(response.email === "mess@iiitu.ac.in"){
              console.log("Mess logged IN")
              navigation.navigate("QR Scanner");
            }
            else{
              console.log("Student logged IN")
               ctx.login(response.token,response.email);
              navigation.navigate("QR Code");
            }
          }
    }).catch(err=>{
      clearInput()
      console.log(err)
    })
    
  }
  
  return (
    <View style={styles.backgroundStyle}>
      <View style={styles.box}>
      <Image style={styles.image} source = {require('../assets/img-removebg-preview.png')} />
      <Text style={styles.TextStyle}>User Login</Text>
      
      <Text style={styles.text}>Enter Username</Text>
      <TextInput value={enteredEmail} onChangeText={(text)=>setEnteredEmail(text)} style={styles.input}/>  
      <Text style={styles.text}>Enter Password</Text>
      <TextInput
        value={enteredPassword} 
        onChangeText={(text)=>setEnteredPassword(text)}
        secureTextEntry={true}
        style={styles.input}
      />
      <View style={styles.buttons}><Button  onPress={login} title="Login"/></View>
    </View>
    </View>
  )
}
const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width:170,
      borderRadius:10,
      // padding: 10 10 10 10
      // paddingBottom:50,
      marginBottom:30
    },
    image:{
      position: 'relative',
      bottom: 40,
      height: 90,
      width: 90,
    },
    text: {
      paddingRight:67,
      fontWeight: 'bold',
    },
    backgroundStyle:{
      margin: 10,
      backgroundColor:'#ADD8E6',
      // height:100,
      flex:1,
      height:'100%',
      width:'100%',
      margin:0,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',

    },
    box:{
      position:'relative',
      left:5,
      // top:90,
      backgroundColor:'white',
      borderRadius:25,
      height:500,
      alignItems:'center',
      justifyContent:'center',
      width:280,
      // borderColor:'black',
      // borderWidth:2,
    },
    buttons:{
        // height: 40,
        width: 100,
        // color:'red',
        // borderRadius:20,
        // marginTop: 10

    },
    TextStyle: {
      position:'relative',
      bottom:30,
      fontSize: 20,
      fontWeight: 'bold',
    }
  });
export default HomeScreen