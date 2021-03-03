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
      var cedula=this.state.cedula;
  //Preguntamos si la cedula consta de 10 digitos
  if(cedula.length == 10){
        
    //Obtenemos el digito de la region que sonlos dos primeros digitos
    var digito_region = cedula.substring(0,2);
    
    //Pregunto si la region existe ecuador se divide en 24 regiones
    if( digito_region >= 1 && digito_region <=24 ){
      
      // Extraigo el ultimo digito
      var ultimo_digito   = cedula.substring(9,10);

      //Agrupo todos los pares y los sumo
      var pares = parseInt(cedula.substring(1,2)) + parseInt(cedula.substring(3,4)) + parseInt(cedula.substring(5,6)) + parseInt(cedula.substring(7,8));

      //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
      var numero1 = cedula.substring(0,1);
      var numero1 = (numero1 * 2);
      if( numero1 > 9 ){ var numero1 = (numero1 - 9); }

      var numero3 = cedula.substring(2,3);
      var numero3 = (numero3 * 2);
      if( numero3 > 9 ){ var numero3 = (numero3 - 9); }

      var numero5 = cedula.substring(4,5);
      var numero5 = (numero5 * 2);
      if( numero5 > 9 ){ var numero5 = (numero5 - 9); }

      var numero7 = cedula.substring(6,7);
      var numero7 = (numero7 * 2);
      if( numero7 > 9 ){ var numero7 = (numero7 - 9); }

      var numero9 = cedula.substring(8,9);
      var numero9 = (numero9 * 2);
      if( numero9 > 9 ){ var numero9 = (numero9 - 9); }

      var impares = numero1 + numero3 + numero5 + numero7 + numero9;

      //Suma total
      var suma_total = (pares + impares);

      //extraemos el primero digito
      var primer_digito_suma = String(suma_total).substring(0,1);

      //Obtenemos la decena inmediata
      var decena = (parseInt(primer_digito_suma) + 1)  * 10;

      //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
      var digito_validador = decena - suma_total;

      //Si el digito validador es = a 10 toma el valor de 0
      if(digito_validador == 10)
        var digito_validador = 0;

      //Validamos que el digito validador sea igual al de la cedula
      if(digito_validador == ultimo_digito){
        console.log('la cedula:' + cedula + ' es correcta');
        this.comprobart();
      }else{
        console.log('la cedula:' + cedula + ' es incorrecta');
        alert("cedula incorrecta");
      }
      
    }else{
      // imprimimos en consola si la region no pertenece
      console.log('Esta cedula no pertenece a ninguna region');
      alert("cedula incorrecta");
    }
 }else{
    //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
    console.log('Esta cedula tiene menos de 10 Digitos');
    alert("cedula incorrecta");
 }  
      
    }

    comprobart=()=>{

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
        else{ //de else
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

        }//de else
        
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