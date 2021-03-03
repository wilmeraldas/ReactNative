import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Input from './Input'
class HomeScreen extends React.Component {
  render() {
    return (
      <View >
        <Text>You have (undefined) friends.</Text>

        <Button
          title="Add some friends"
          onPress={() =>
            this.props.navigation.navigate('Inicio')
          }
        />
      </View>
    );
  }
}

export default HomeScreen;