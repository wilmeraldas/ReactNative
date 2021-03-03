import React, { State, useState } from 'react'
import { View, Text, Button, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'

import { Link } from '@react-navigation/native';
import Input from './Input'

import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
class NSolicitud extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Registro',
    headerLeft: null,
    headerRight:
      <TouchableOpacity
        onPress={() => navigation.navigate('HomeScreen')}
        style={{ margin: 10, backgroundColor: 'orange', padding: 10 }}>

        <Text style={{ color: '#ffffff' }}>Home</Text>
      </TouchableOpacity>

  });
  constructor(props) {
    super(props);
    this.state = { 
      isVisible:false,
      chosenDate: ''
    };
     

  }

  CreateUserScreen = (props) => {
    const [state, setState] = useState({
     
      chosenDate:" "

    });

  }

  comprobar = () => {

    var chosenDate = this.state.chosenDate;
  
    if (chosenDate.length == 0) {
      //alert("sin datos");
    }
    else {
      //alert("esperando el api")
      //var LoginAPIURL="http://localhost/Libro/login.php";



      fetch('http://localhost/Libro/NSolicitud.php', {
        method: 'post',
        header: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          // we will pass our input data to server
          chosenDate: chosenDate
          
        })

      })

        .then((response) => response.json())
        .then((response) => {

           alert(response)
          if (response == "ok") {
            // redirect to profile page
            //alert("Successfully Login");
            this.props.navigation.navigate('Home');
          } else {
            //alert("Wrong Login Details");
          }
        })
        .catch((error) => {
          alert("Error" + error);
          console.error(error);
        });

    }

  }
handlePicker=(datetime)=>
{

  this.setState({

    isVisible:false,
    chosenDate:moment(datetime).format('YYYY-MM-DD HH:mm:ss')
  })
}

showPicker= () =>
{
  this.setState({

    isVisible:true
    
  })

}


hidePicker=()=>
{

  this.setState({

    isVisible:false
   
  })
}
  render() {

    return (
      <ScrollView style={styles.container}>

        <Image style={styles.imageStyle} source={require('../Images/logo.png')} />
        <Text style={{
          fontWeight: 'bold', color: '#F46D09', fontSize: 20, margin: 5, borderBottomWidth: 1,
          width: 240,
          marginVertical: 5, borderColor: '#F46D09'
        }}>
          Examen Psicosensométrico
          </Text>
          <Text>
            {this.state.chosenDate}
          </Text>

         
            <TouchableOpacity style={{
          fontWeight: 'bold', color: '#F46D09', fontSize: 20, margin: 5, borderBottomWidth: 1,
          width: 240,
          marginVertical: 5, borderColor: '#F46D09',padding: 15
        }} onPress={ this.showPicker} ><Text>Elegir fecha y hora</Text></TouchableOpacity>
     
        <View style={{ alignItems: 'center' }} >
          <TouchableOpacity
            style={{ backgroundColor: '#F46D09', padding: 15, borderRadius: 12, textAlign: 'center', width: 90 }}
            onPress={this.comprobar}  >
            <Text style={{ color: '#fff' }}>Aceptar</Text>
          </TouchableOpacity>


          <DateTimePickerModal
            isVisible={this.state.isVisible}
            mode="datetime"
            onConfirm={this.handlePicker}
            onCancel={this.hidePicker}
          />

        </View>

      </ScrollView>


    )
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,


  },
  inputGroup: {
    flex: 1,
    padding: 0
    //marginBottom:15,
    //borderBottomWidth:1,
    //borderBottomColor:"blue"

  },
  btn: {
    backgroundColor: 'red',
    flex: 1,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'red'

  },
  Lnk: {
    flex: 2,
    backgroundColor: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    textDecorationLine: 'underline',
    color: 'blue'
  },
  imageStyle: {
    flex: 1,
    padding: 0,
    width: 200,
    height: 30,
    marginBottom: 15
  },

})



export default NSolicitud;