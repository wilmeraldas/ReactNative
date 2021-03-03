import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet,FlatList ,View, Text,TouchableOpacity,Image} from 'react-native';
import axios from 'axios' //npm i axios

import { useNavigation } from '@react-navigation/native';

import { Link } from '@react-navigation/native';

//componentes personalizados
import ItemLibro from './ItemLibro'
import Input from './Input'

export default function App() {

const navigation = useNavigation();


 const [listaLibros, setListaLibros] = useState([])
 const [sumilla, setSumilla] = useState('')
 const [destinatario, setDestinatario] = useState('')
 const [fecha_creacion, setFecha_creacion] = useState('')
 const [tipo, setTipo] = useState('')
 const [firma, setFirma] = useState('')
 const [contenido, setContenido] = useState('')
 const [codsolicitud, setCodsolicitud] = useState('')
 const [date, setDate] = useState('')
 const [bandera, setBandera] = useState(false) 
 useEffect(() => {
    getLibros()
  }, [])

 const getLibros = async() => {
   const respuesta = await axios.get('http://localhost/Libro/index.php')
   setListaLibros(respuesta.data)
}

 const addLibro = async() => {
  const obj = {sumilla, destinatario,contenido,date,tipo,firma}
  const respuesta = await axios.post('http://localhost/Libro/index.php', obj)
  alert(respuesta.data.msg)
  getLibros()
  setSumilla('') 
  setDestinatario('') 
  setDate('')
  //setFecha_creacion('')
  setTipo('')
  setFirma('')
  setContenido('')
  
}

const deleteLibro = async (props) => {
  const codsolicitud = props.codsolicitud
  const respuesta = await axios.delete('http://localhost/Libro/index.php?id=' + codsolicitud )
  alert(respuesta.data.msg)
  getLibros()
}

const getLibro = async(props) => {
  const codsolicitud = props.codsolicitud
  const respuesta = await axios.get('http://localhost/Libro/index.php?id=' + codsolicitud )
  setCodsolicitud(respuesta.data.codsolicitud)
  setSumilla(respuesta.data.sumilla)
  setDestinatario(respuesta.data.destinatario)
  setFecha_creacion(respuesta.data.fecha_creacion)
  setTipo(respuesta.data.tipo)
  setFirma(respuesta.data.firma)
  setContenido(respuesta.data.contenido)
  setBandera(!bandera)
} 

const updateLibro = async() => {
  const obj = {codsolicitud, sumilla, destinatario,contenido,fecha_creacion,tipo,firma} 
  const respuesta = await axios.put('http://localhost/Libro/index.php',obj)
  alert(respuesta.data.msg)
  setCodsolicitud('') 
  setSumilla('')    
  setDestinatario('')
  setFecha_creacion('')
  setTipo('')
  setFirma('')
  setContenido('')
  setBandera(false)
  getLibros()
} 

const addOrUpdate = () => {
 {bandera? updateLibro() : addLibro() } 
}

useEffect(() => {
  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds
  setDate(
    year + '/' + month + '/' + date + ' ' + hours + ':' + min + ':' + sec
  );
}, []);


 const renderItem = ({ item }) => (
    <ItemLibro codsolicitud={item.codsolicitud} getlibro={getLibro}
       sumilla={item.sumilla} 
       destinatario={item.destinatario}
        fecha_creacion={item.fecha_creacion} 
        tipo={item.tipo}
        firma={item.firma}
        contenido={item.contenido} 
        mypress={deleteLibro}
    /> )

return (
  
   <View style={styles.container}>
     <View> 

       </View> 
  
      <View style={{flex:0.1, marginTop:20,marginBottom:25 }} >

      <View style={{backgroundColor: 'transparent',opacity: 0.5}}>

<Link style={styles.Lnk} onPress={() =>
            navigation.navigate('Login')
          }>Salir</Link>
        </View>
      <Image style={styles.imageStyle} source={require('../Images/logo.png')}/> 
     

         <Text style={{fontWeight:'bold',color:'#F46D09', fontSize:20,margin:5,borderBottomWidth:1,
        width:240,
        marginVertical:5,borderColor:'#F46D09'}}>
             SOLICITUDES 
          </Text>
      </View> 

      <Input texto={"Sumilla"} valor={sumilla} campo={e=>setSumilla(e)}/>
      <Input texto={"Destinatario"} valor={destinatario} campo={e=>setDestinatario(e)}/>
      
     
 
      <Input texto={date} valor={date} campo={date=>setDate() }editable={false} style={{backgroundColor: '#000'}}/>
      <Input texto={"Tipo"} valor={tipo} campo={e=>setTipo(e)}/>
      <Input texto={"Firma"} valor={firma} campo={e=>setFirma(e)}/>
      <Input texto={"Contenido"} valor={contenido} campo={e=>setContenido(e)}/>
      <TouchableOpacity 
            style={{backgroundColor:'#F46D09', padding:15,borderRadius:12}}
            onPress={addOrUpdate}  >
          <Text style={{color:'#fff'}}>{bandera? "Modificar":"Aceptar"}</Text>
      </TouchableOpacity>

     <FlatList
        style={{marginTop:15}}
        data={listaLibros}
        renderItem={renderItem}
        keyExtractor={item =>item.codsolicitud} 
      />
      <StatusBar style="auto" />
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Lnk  :{
    flex: 2,
    backgroundColor: '#fff',
    textAlign:'right',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:5,
    textDecorationLine: 'underline',
    color:'blue'
  },
  imageStyle  :{
    flex:1,
    padding:2,
    width:200, 
    height:30 
      }

});
