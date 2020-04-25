import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet,Button,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';


function GoToButton({ screenName,title }) {
  const navigation = useNavigation();

  return (
<TouchableOpacity style={styles.button} onPress={() => navigation.navigate(screenName)}>
	<Text style={[styles.countText]}>{title}</Text>
</TouchableOpacity>
  );
}

export default class Initial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      Global:
	{
	    NewConfirmed: 0,
            TotalConfirmed: 0,
	    NewDeaths: 0,
            TotalDeaths: 0,
            NewRecovered: 0,
            TotalRecovered: 0,
	    LiveCases:0,

	},
      isLoading: true
    };
  }


  componentDidMount() {
    fetch('https://api.covid19api.com/summary')
      .then((response) => response.json())
      .then((json) => {
	var live = json.Global.TotalConfirmed-json.Global.TotalDeaths-json.Global.TotalRecovered;
        this.setState(
	{
	date:json.Countries[0].Date,
	Global:
	{
	   NewConfirmed:json.Global.NewConfirmed,
           TotalConfirmed:json.Global.TotalConfirmed,
	   NewDeaths: json.Global.NewDeaths,
           TotalDeaths: json.Global.TotalDeaths,
           NewRecovered: json.Global.NewRecovered,
           TotalRecovered: json.Global.TotalRecovered,
	   LiveCases: live,
	}});
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
 
  render() {
    const {isLoading,Global } = this.state;

    return (
      <View style={styles.container}>
	<Text style={styles.title1}>COVID19</Text>
       <Text style={styles.title2}>Global Cases:</Text>
	<Text style={styles.basetext}>{this.state.date}</Text>
	 <Text style={styles.basetext}>AciveCases: {this.state.Global.LiveCases}</Text>
       <Text style={styles.basetext}>NewConfirmed: {this.state.Global.NewConfirmed}</Text>
       <Text style={styles.basetext}>TotalConfirmed: {this.state.Global.TotalConfirmed}</Text>
       <Text style={styles.basetext}>NewDeaths: {this.state.Global.NewDeaths}</Text>
       <Text style={styles.basetext}>TotalDeaths: {this.state.Global.TotalDeaths}</Text>
       <Text style={styles.basetext}>NewRecovered: {this.state.Global.NewRecovered}</Text>
       <Text style={styles.basetext}>TotalRecovered: {this.state.Global.TotalRecovered}</Text>
	<GoToButton title="Global Active Cases" screenName="Date" />
        <GoToButton title="Global Cases on Map" screenName="Home" />
	<GoToButton title="Search and Get More Information" screenName="Search" />
      </View>
    );
  }
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: '#b0e0e6'
  },
  button: {
    //width: "90%",
    height: 30,
    margin: 10,
    alignItems: "center",
    backgroundColor: "#a9a9a9",
    padding: 15,
    justifyContent: 'center', 
    borderRadius: 30
  },
 title1:{
 fontSize: 55,
 fontWeight: "bold",
 textAlign: 'center',
 textAlignVertical: 'center',
 padding: 10
},

title2:{
 fontSize: 30,
 fontWeight: "normal",
 textAlign: 'center',
 textAlignVertical: 'center',
 padding: 5
},

basetext:{
 fontSize: 20,
 fontWeight: "normal",
 textAlign: 'center',
 textAlignVertical: 'center',
 padding: 3
},

countText:{
 fontSize: 20,
 fontWeight: "normal",
 textAlign: 'center',
 textAlignVertical: 'center',
 padding: 3,
 color: 'white',
}
});
