import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet,Button,TouchableOpacity} from 'react-native';
import MapView, { PROVIDER_GOOGLE ,Marker,Callout} from 'react-native-maps';
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

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      total: '',
      country: '',
      dcountry:[],
      dsimple:[],
      dtotal: {},
      date: '',
      markers: [],
      isLoading: true
    };
  }

  setMarker = (latt,lngg,countryd) => {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: {
            latitude: latt,
            longitude: lngg,
          },
          title: countryd,
          description: this.state.dtotal[countryd],
        },
      ],
    });
  };

  componentDidMount() {
    fetch('https://api.covid19api.com/summary')
      .then((response) => response.json())
      .then((json) => {
        var i;
        for (i = 0; i < json.Countries.length; i++) {
         var datacountry = json.Countries[i]["Country"];
         var datasimple = json.Countries[i]["Slug"];
         var datatotal = json.Countries[i]["TotalConfirmed"].toString();
	var datanewcon = json.Countries[i]["NewConfirmed"].toString();
	var datatotaldeath = json.Countries[i]["TotalDeaths"].toString();
	var datanewdeath = json.Countries[i]["NewDeaths"].toString();
	var datanewrec = json.Countries[i]["NewRecovered"].toString();
	var datatotalrec = json.Countries[i]["TotalRecovered"].toString();
	var final = "TC:"+datatotal+" NC:"+datanewcon+" TD:"+datatotaldeath+" ND:"+datanewdeath+" TR:"+datatotalrec+" NR:"+datanewrec;
         this.state.dtotal[datacountry] = final;
         this.state.dcountry.push(datacountry);
         this.state.dsimple.push(datasimple);
         }
         for (i = 0; i < this.state.dsimple.length; i++) {
         fetch('https://api.covid19api.com/dayone/country/'+this.state.dsimple[i])
        .then((response) => response.json())
        .then(json => {
            if(json.length>0){
            var latt = parseFloat(json[0].Lat);
            var lngg = parseFloat(json[0].Lon);
            var countryd = json[0].Country;
            this.setState({latitude:latt,longitude:lngg,country:countryd})
            this.setMarker(latt,lngg,countryd);
	}
        })
        .catch(error => console.warn(error));
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
 
  render() {
    const {isLoading} = this.state;

    return (
      <View style={styles.container}>
        <MapView
      	    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
               latitude: 42.36,
               longitude: -71.06,
               latitudeDelta: 40,
               longitudeDelta: 40,
             }}
            >
{this.state.markers.map(marker => (
    <Marker
      coordinate={marker.coordinate}
      title={marker.title}
      key={marker.title}
      description={marker.description}
    />
  ))}
         </MapView>
	<Text style={styles.basetext}>TC:TotalConfirmed   NC:NewConfirmed    TD:TotalDeaths</Text>
	<Text style={styles.basetext}>TR:TotalRecovered   NR:NewRecovered    ND:NewDeaths</Text>
	<GoToButton screenName="Initial" title="RETURN"/>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  map: {
     height: '88%',
     width: '100%'
  },
 container: {
    flex: 1,
    justifyContent: "center",
    //paddingHorizontal: 0,
    backgroundColor: '#f8f8ff'
  },
 button: {
    width: "100%",
    //height: 30,
    //margin: 10,
    alignItems: "center",
    backgroundColor: "#a9a9a9",
    //padding: 15,
    justifyContent: 'center', 
    borderRadius: 30
  },
basetext:{
 fontSize: 15,
 fontWeight: "normal",
 textAlign: 'center',
 textAlignVertical: 'center',
 padding: 1
},
countText:{
 fontSize: 18,
 fontWeight: "normal",
 textAlign: 'center',
 textAlignVertical: 'center',
 //padding: 3,
 color: 'white',
}
});
