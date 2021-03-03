import React, {State, useState} from 'react'
import {View, Text, Button, ScrollView, StyleSheet,Image,TextInput,TouchableOpacity} from 'react-native'

import { Link } from '@react-navigation/native';
import Input from './Input'


class Registro extends React.Component
{
	static navigationOptions= ({navigation}) =>({
    title: 'Registro',	
    headerLeft: null,
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
this.state={
  correo:'',
  cedula:'',
  nombre:'',
  apellido:'',
  celular:'',
  direccion:'',
contrasenia:''

};

    }

    CreateUserScreen=(props) =>{
const [state,setState]=useState({
  correo:"",
  cedula:"",
  nombre:"",
  apellido:"",
  celular:"",
  direccion:"",
contrasenia:""

});

    }

    comprobar=()=>{

      var correo=this.state.correo;
      var cedula=this.state.cedula;
      var nombre=this.state.nombre;
      var apellido=this.state.apellido;
      var celular=this.state.celular;
      var direccion=this.state.direccion;
        var contrasenia=this.state.contrasenia;
        if(correo.length==0||nombre.length==0||apellido.length==0||contrasenia.length==0||cedula.length==0) 
        {
            alert("sin datos");
        }
        else{ 
//alert("esperando el api")
//var LoginAPIURL="http://localhost/Libro/login.php";


fetch('http://localhost/Libro/reg.php',{
			method:'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				// we will pass our input data to server
				correo:correo,
        cedula: cedula,
        nombre: nombre,
        apellido:apellido,
        celular:celular,
        direccion:direccion,
				contrasenia: contrasenia
			})
			
		})
    
    .then((response) => response.json())
    .then((response)=>{
     
      //alert(response)
      if(response == "ok"){
        // redirect to profile page
        alert("registro listo");
        //this.props.navigation.navigate('Inicio');
      }else{
        alert("no vale");
      }
    })
    .catch((error)=>{
      alert("Error"+error);
    console.error(error); 
    });

        }
        
    }

    render()
    {

        return(
<ScrollView style={styles.container}>

 <Image style={styles.imageStyle} source={require('../Images/logo.png')}/> 
        
 <TextInput  placeholder="Correo" onChangeText={correo => this.setState({correo})}/>
 <TextInput  placeholder="Cedula" onChangeText={cedula => this.setState({cedula})}/>
 <TextInput  placeholder="Nombre" onChangeText={nombre => this.setState({nombre})}/>
 <TextInput  placeholder="Apellido" onChangeText={apellido => this.setState({apellido})}/>
 <TextInput  placeholder="Celular" onChangeText={celular => this.setState({celular})}/>
 <TextInput  placeholder="Direccion" onChangeText={direccion => this.setState({direccion})}/>
<TextInput  secureTextEntry={true}  autoCorrect={false} placeholder="Contraseña" onChangeText={contrasenia => this.setState({contrasenia})}/>  


<View style={{alignItems:'center'}} > 
<TouchableOpacity 
            style={{backgroundColor:'#F46D09', padding:15,borderRadius:12,textAlign:'center',width:90}}
            onPress={this.comprobar}  >
          <Text style={{color:'#fff'}}>Aceptar</Text>
      </TouchableOpacity>


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

export default Registro;