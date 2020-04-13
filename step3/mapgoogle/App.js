import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'
/*
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to covid project</Text>
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
*/
/*
function HelloWorldApp() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Hello, world!</Text>
    </View>
  )
}
export default HelloWorldApp;
*/
/*
const styles = StyleSheet.create({
  center: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: 'center'
  }
})
function Greeting(props) {
  return (
    <View style={styles.center}>
      <Text>Hello {props.name}!</Text>
    </View>
  );
}
function LotsOfGreetings() {
  return (
    <View style={[styles.center, {top: 50}]}>
      <Greeting name='Rexxar' />
      <Greeting name='Jaina' />
      <Greeting name='Valeera' />
    </View>
  );
}
export default LotsOfGreetings;
*/
/*
class App extends Component {
  state = {
    count: 0
  }
  onPress = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
 render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
         style={styles.button}
         onPress={this.onPress}
        >
         <Text>Click me</Text>
        </TouchableOpacity>
        <View style={styles.countContainer}>
          <Text>
            You clicked { this.state.count } times
          </Text>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10
  }
})
export default App;
*/

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
export default () => (
  <View>
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      region={{
        latitude: 42.36,
        longitude: -71.06,
        latitudeDelta: 1.5,
        longitudeDelta: 1.5,
      }}
    >
    </MapView>
  </View>
);

const styles = StyleSheet.create({
  map: {
     height: '100%',
     width: '100%'
  },
});