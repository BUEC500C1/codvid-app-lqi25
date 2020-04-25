import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet,Button,TouchableOpacity} from 'react-native';
import MapView, { PROVIDER_GOOGLE ,Marker} from 'react-native-maps';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-datepicker';


function GoToButton({ screenName,title }) {
  const navigation = useNavigation();

  return (
<TouchableOpacity style={styles.button} onPress={() => navigation.navigate(screenName)}>
	<Text style={[styles.countText]}>{title}</Text>
</TouchableOpacity>
  );
}


export default class Date extends Component {
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
      dlive: {},
      live: '',
      newdate:"2020-04-20T00:00:00Z",
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
          description: this.state.dlive[countryd],
        },
      ],
    });
  };


  createmap() {
    this.setState({markers:[],dlive:{}})
    fetch('https://api.covid19api.com/summary')
      .then((response) => response.json())
      .then((json) => {
        var i;
        for (i = 0; i < json.Countries.length; i++) {
         var datacountry = json.Countries[i]["Country"];
         var datasimple = json.Countries[i]["Slug"];
         var datatotal = json.Countries[i]["TotalConfirmed"].toString();
         this.state.dtotal[datacountry] = datatotal;
         this.state.dcountry.push(datacountry);
         this.state.dsimple.push(datasimple);
         }
         for (i = 0; i < this.state.dsimple.length; i++) {
         fetch('https://api.covid19api.com/total/country/'+this.state.dsimple[i])
        .then((response) => response.json())
        .then(json => {
            if(json.length>0){
            var filteredData = json.filter(json => json.Date === this.state.newdate);
            if (filteredData.length>0)
		{
		var llive = filteredData[0].Confirmed - filteredData[0].Deaths - filteredData[0].Recovered;
                var result = "Active Cases:"+llive.toString();
            	this.state.dlive[filteredData[0].Country] = result;
            	this.setState({live:result})
		}
	}
        })
        .catch(error => console.warn(error));
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
    const {isLoading,Global } = this.state;

    return (
      <View >
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
      //key = {marker.title}
      description={marker.description}
    />
  ))}
         </MapView>
	<DatePicker
          style={{width: "100%", height:35}}
          date={this.state.newdate} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2020-01-01"
          maxDate="2020-05-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          //showIcon={false}
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 130
            },
            dateInput: {
              //marginLeft: 100,
		padding: 10,
            },
	dateText:{
	fontSize: 17,
	textAlign: "center",
	//padding: 12,
	}
          }}
          onDateChange={(date) => {this.setState({newdate: (date+'T00:00:00Z'),datechange: true})}}
        />
	<View style={styles.row}>
	<View style={styles.inputcol}>
	<View style={styles.inputWrap}>
	<TouchableOpacity style={styles.button} onPress={ this.createmap.bind(this) }>
	<Text style={[styles.countText]}>SEARCH</Text>
	</TouchableOpacity>
	</View>
	<View style={styles.inputWrap}>
	<GoToButton screenName="Initial" title="RETURN"/>
	</View>
	</View>
	</View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  map: {
     height: '92%',
     width: '100%'
  },
row: {
    flex: 1,
    flexDirection: "column",
    height:"100%",
  },
inputWrap: {
    flex: 1,
    flexDirection: "column",
  },
inputcol: {
  flex: 1,
  //justifyContent: 'space-between',
  flexDirection: 'row'
},
 container: {
    flex: 1,
    justifyContent: "center",
    //paddingHorizontal: 0,
    backgroundColor: '#f8f8ff'
  },
 button: {
    width: "100%",
    height: 35,
    //margin: 3,
    alignItems: "center",
    backgroundColor: "#a9a9a9",
    padding: 3,
    justifyContent: 'center', 
    //borderRadius: 30
  },
basetext:{
 fontSize: 17,
 fontWeight: "normal",
 textAlign: 'center',
 textAlignVertical: 'center',
 padding: 1
},
countText:{
 fontSize: 17,
 fontWeight: "normal",
 textAlign: 'center',
 textAlignVertical: 'center',
 padding: 3,
 color: 'white',
}
});

