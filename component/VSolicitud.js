import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet,FlatList ,View, Text,TouchableOpacity} from 'react-native';
import axios from 'axios' //npm i axios

//componentes personalizados
import ItemSol from './ItemSol'
import InputS from './InputS'
export default function App() {

 const [listaLibros, setListaLibros] = useState([])
 const [fechahora, setFechahora] = useState('')
 const [estado, setEstado] = useState('')
 const [observacion, setObservacion] = useState('')
 const [codhorario, setCodhorario] = useState('')
 const [bandera, setBandera] = useState(false) 
 useEffect(() => {
    getLibros()
  }, [])

 const getLibros = async() => {
   const respuesta = await axios.get('http://localhost/Libro/indexs.php')
   setListaLibros(respuesta.data)
}

 const addLibro = async() => {
  const obj = {fechahora, estado,observacion}
  const respuesta = await axios.post('http://localhost/Libro/indexs.php', obj)
  alert(respuesta.data.msg)
  getLibros()
  setFechahora('')
  setEstado('')
  setObservacion('')
}

const deleteLibro = async (props) => {
  const codhorario = props.codhorario
  const respuesta = await axios.delete('http://localhost/Libro/indexs.php?codhorario='+codhorario)
  alert(respuesta.data.msg)
  getLibros()
}

const getLibro = async(props) => {
  const codhorario = props.codhorario
  const respuesta = await axios.get('http://localhost/Libro/indexs.php?codhorario='+codhorario)
  //setCodhorario(respuesta.data.codhorario) // http://localhost/Libro/indexs.php?codhorario=3
  setFechahora(respuesta.data.fechahora)
  alert(estado)
  setEstado(respuesta.data.estado)
  setObservacion(respuesta.data.observacion)
  setBandera(!bandera)
} 

const updateLibro = async() => {
  const obj = {codhorario, fechahora, estado,observacion} 
  const respuesta = await axios.put('http://localhost/Libro/indexs.php',obj)
  alert(respuesta.data.msg)
  //setCodhorario('') 
  setFechahora('')
  setEstado('')
  setObservacion('')
  setBandera(false)
  getLibros()
} 

const addOrUpdate = () => {
 {bandera? updateLibro() : addLibro() }
}

 const renderItem = ({ item }) => (
    <ItemSol codhorario={item.codhorario} getlibro={getLibro}
       fechahora={item.fechahora} estado={item.estado} observacion={item.observacion} mypress={deleteLibro}
    /> )

return (
   <View style={styles.container}>
      <View style={{flex:0.1, marginTop:20,marginBottom:25 }} >
         <Text style={{fontWeight:'bold',color:'#0E69E5', fontSize:20}}>
             HORARIOS SOLICITADOS
          </Text>
      </View> 
      <InputS texto={"Fecha"} valor={fechahora} campo={e=>setFechahora(e)}/>
      <InputS texto={"Estado"} valor={estado} campo={e=>setEstado(e)}/>
      <InputS texto={"Observacion"} valor={observacion} campo={e=>setObservacion(e)}/>
      <TouchableOpacity 
            style={{backgroundColor:'#0E69E5', padding:15,borderRadius:12}}
            onPress={addOrUpdate}  >
          <Text style={{color:'#fff'}}>{bandera? "Edit":"Add"}</Text>
      </TouchableOpacity>

     <FlatList
        style={{marginTop:15}}
        data={listaLibros}
        renderItem={renderItem}
        keyExtractor={item =>item.id} 
      />
      <StatusBar style="auto" />
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
