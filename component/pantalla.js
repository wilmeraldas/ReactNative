import React, {State, useState} from 'react'
import {View, Text, Button, ScrollView, StyleSheet,Image,TextInput,TouchableOpacity} from 'react-native'

import { Link } from '@react-navigation/native';
import Input from './Input'

class pantalla extends React.Component
{
	static navigationOptions= ({navigation}) =>({
    title: 'Login',	
    headerRight:	
    <TouchableOpacity
    onPress={() => navigation.navigate('HomeScreen')}
    style={{margin:10,backgroundColor:'orange',padding:10}}>
    <Text style={{color:'#ffffff'}}>Home</Text>
    </TouchableOpacity>
  
}); 
    constructor(props)
    {
super(props);
this.state={usuario:'',contrasenia:''};

    }

    CreateUserScreen=(props) =>{
const [state,setState]=useState({
usuario:"",
contrasenia:""

});

    }

    comprobar=()=>{

        var usuario=this.state.usuario;
        var contrasenia=this.state.contrasenia;
      // alert(usuario);
        if(usuario.length==0||contrasenia.length==0) 
        {
            //alert("sin datos");
        }
        else{ 
//alert("esperando el api")
//var LoginAPIURL="http://localhost/Libro/login.php";

var Data={
usuario:usuario,
contrasenia:contrasenia

};

fetch('http://localhost/Libro/login.php',{
			method:'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				// we will pass our input data to server
				usuario: usuario,
				contrasenia: contrasenia
			})
			
		})
    
    .then((response) => response.json())
    .then((response)=>{
     
     // alert(response)
      if(response == "ok"){
        // redirect to profile page
        //alert("Successfully Login");
        this.props.navigation.navigate('Inicio');
      }else{
        //alert("Wrong Login Details");
      }
    })
    .catch((error)=>{
      alert("Error XD"+error);
    console.error(error); 
    });

        }
        
    }

    render()
    {

        return(
<ScrollView style={styles.container}>

 <Image style={styles.imageStyle} source={require('../Images/logo.png')} /> 
        

 <TextInput  placeholder="Usuario" onChangeText={usuario => this.setState({usuario})}/>
<TextInput  secureTextEntry={true}  autoCorrect={false} placeholder="Contraseña" onChangeText={contrasenia => this.setState({contrasenia})}/>    


<View style={{alignItems:'center'}} > 
<TouchableOpacity 
            style={{backgroundColor:'#F46D09', padding:15,borderRadius:12,textAlign:'center',width:90}}
            onPress={this.comprobar}  >
          <Text style={{color:'#fff'}}>Aceptar</Text>
      </TouchableOpacity>


</View>
<View style={{backgroundColor: 'transparent',opacity: 0.5}}>

<Link style={styles.Lnk} onPress={() =>
            this.props.navigation.navigate('Registro')
          }>Registrarse</Link>
        </View>
        </ScrollView>
        

        )
    }
}




const styles = StyleSheet.create({
container:{
flex:1,
padding:35,


},
  inputGroup  :{
flex:1,
padding:0
//marginBottom:15,
//borderBottomWidth:1,
//borderBottomColor:"blue"

  },
  btn:{
backgroundColor:'red',
flex:1,
marginBottom:15,
borderBottomWidth:1,
borderBottomColor:'red'

  },
  Lnk  :{
    flex: 2,
    backgroundColor: '#fff',
    textAlign:'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:5,
    textDecorationLine: 'underline',
    color:'blue'
  },
  imageStyle  :{
    flex:1,
    padding:0,
    width:200, 
    height:30 ,
    marginBottom:15
      },

})

export default pantalla;