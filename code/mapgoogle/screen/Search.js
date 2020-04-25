import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text,TextInput, View, StyleSheet,Button,TouchableOpacity} from 'react-native';
import MapView, { PROVIDER_GOOGLE ,Marker} from 'react-native-maps';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-datepicker';
import { SearchBar } from 'react-native-elements';


function GoToButton({ screenName,title }) {
  const navigation = useNavigation();

  return (
<TouchableOpacity style={styles.button} onPress={() => navigation.navigate(screenName)}>
	<Text style={[styles.countText]}>{title}</Text>
</TouchableOpacity>
  );
}


export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 42.36,
      longitude: -71.06,
      latdelta: 40,
      londelta: 40,
      total: '',
      country: '',
      text: '',
      province: '',
      city: '',
      information: '',
      newdate:"2020-04-20T00:00:00Z",
      markers: [],
      isLoading: true
    };

  }

  setMarker = (latt,lngg,countryd,final) => {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: {
            latitude: latt,
            longitude: lngg,
          },
          title: countryd,
          description: final,
        },
      ],
    });
  };


  updateText = text => {
    this.setState({ text:text });
  };

updateprovince = province => {
    this.setState({ province:province });
  };
updatecity = city => {
    this.setState({ city:city });
  };

  createmap() {
    this.setState({markers:[],dlive:{}})
    fetch('https://api.covid19api.com/dayone/country/'+this.state.text)
      .then((response) => response.json())
      .then((json) => {
	if(json.length>0)
	{
	var filteredData = json.filter(json => json.Date === this.state.newdate);
	if(filteredData.length>0)
	{
	   if(this.state.province === '')
	   {
	      if(filteredData[0]["Province"] === "")
	      {
	         var tdata = filteredData[0];
		 var dactive = tdata["Confirmed"]-tdata["Deaths"]-tdata["Recovered"];
	         this.setState({latitude:parseFloat(tdata["Lat"]),longitude:parseFloat(tdata["Lon"]),latdelta:20,londelta:20})
	         var final = "AC:"+dactive.toString()+" CF:"+tdata["Confirmed"].toString()+" DT:"+tdata["Deaths"].toString()+" RC:"+tdata["Recovered"].toString();
	         this.setMarker(parseFloat(tdata["Lat"]),parseFloat(tdata["Lon"]),tdata["Country"],final);
	      }
	      if(filteredData[0]["Province"] !== "" && filteredData[0]["City"] === "")
	      {
		var i;
		for(i = 0;i<filteredData.length;i++)
		{
	            var cdata = filteredData[i];
		    var dactive = cdata["Confirmed"]-cdata["Deaths"]-cdata["Recovered"];
	            this.setState({latitude:parseFloat(cdata["Lat"]),longitude:parseFloat(cdata["Lon"]),latdelta:20,londelta:20})
	            var final = "AC:"+dactive.toString()+" CF:"+cdata["Confirmed"].toString()+" DT:"+cdata["Deaths"].toString()+" RC:"+cdata["Recovered"].toString();
	            this.setMarker(parseFloat(cdata["Lat"]),parseFloat(cdata["Lon"]),cdata["Province"],final);		
		}
	      }
	      if(filteredData[0]["Province"] !== "" && filteredData[0]["City"] !== "")
	      {
		this.setState({information:"Please enter province and city"})
	      }

	   }
	   if(this.state.province !== '')
	   {
		var filtered = filteredData.filter(filteredData => filteredData.Province === this.state.province);
		if(filtered.length>0)
		{
		   if(filtered[0]["City"] === "")
		   {
	            var tdata = filtered[0];
		    var dactive = tdata["Confirmed"]-tdata["Deaths"]-tdata["Recovered"];
	            this.setState({latitude:parseFloat(tdata["Lat"]),longitude:parseFloat(tdata["Lon"]),latdelta:10,londelta:10})
	            var final = "AC:"+dactive.toString()+" CF:"+tdata["Confirmed"].toString()+" DT:"+tdata["Deaths"].toString()+" RC:"+tdata["Recovered"].toString();
	            this.setMarker(parseFloat(tdata["Lat"]),parseFloat(tdata["Lon"]),tdata["Province"],final);
		   }
		   if(filtered[0]["City"] !== "")
		   {
			if(this.state.city === "")
			{
			   this.setState({information:"Please enter the city"})
			}
			if(this.state.city !== "")
			{
			   var fil = filtered.filter(filtered => filtered.City === this.state.city);
			   if(fil.length>0)
			   {
	                      var tdata = fil[0];
			      var dactive = tdata["Confirmed"]-tdata["Deaths"]-tdata["Recovered"];
	                      this.setState({latitude:parseFloat(tdata["Lat"]),longitude:parseFloat(tdata["Lon"]),latdelta:10,londelta:10})
	                      var final = "AC:"+dactive.toString()+" CF:"+tdata["Confirmed"].toString()+" DT:"+tdata["Deaths"].toString()+" RC:"+tdata["Recovered"].toString();
	                      this.setMarker(parseFloat(tdata["Lat"]),parseFloat(tdata["Lon"]),tdata["City"],final);
			   }
			}
		
		  }
		}
  	   }
	}
	}
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
 
  render() {
    const {isLoading,text,province,city} = this.state;

    return (
      <View style={styles.container}>
        <MapView
      	    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
               latitude: this.state.latitude,
               longitude: this.state.longitude,
               latitudeDelta: this.state.latdelta,
               longitudeDelta: this.state.londelta,
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
	<Text style={styles.basetext1}>Information: {this.state.information}</Text>
	<Text style={styles.basetext1}>AC:Active   CF:Confirmed   DT:Deaths   RC:Recovered</Text>
	<View style={styles.row}>
	<View style={styles.inputcol}>
	<DatePicker
          style={{width: "100%", height:"100%"}}
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
		//padding: 10,
            },
	dateText:{
	fontSize: 17,
	textAlign: "center",
	//padding: 15,
	}
          }}
          onDateChange={(date) => {this.setState({newdate: (date+'T00:00:00Z'),datechange: true})}}
        />
	</View>
	<View style={styles.inputcol}>
	<View style={styles.inputWrap}>
<TextInput style = {styles.input}
        placeholder="Country"
        onChangeText={this.updateText}
        defaultValue={text}
      />
	</View>
	<View style={styles.inputWrap}>
<TextInput style = {styles.input}
        placeholder="Province"
        onChangeText={this.updateprovince}
        defaultValue={province}
      />
	</View>
	<View style={styles.inputWrap}>
<TextInput style = {styles.input}
        placeholder="City"
        onChangeText={this.updatecity}
        defaultValue={city}
      />
	</View>
	</View>
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
     height: '75%',
     width: '100%'
  },
row: {
    flex: 1,
    flexDirection: "column",
    height:"100%",
  },
   input: {
      //margin: 15,
      height: "100%",
      borderColor: 'gray',
      borderWidth: 1,
      fontSize:17,
   },
 inputWrap1: {
    flex: 1,
    //height: 20,
    flexDirection: "column",
    //borderColor: "#cccccc",
    //borderBottomWidth: 1,
    //marginBottom: 10
  },
inputWrap: {
    flex: 1,
    //height: 20,
    flexDirection: "column",
    //borderColor: "#cccccc",
    //borderBottomWidth: 1,
    //marginBottom: 10
  },
inputcol: {
  flex: 1,
  //justifyContent: 'space-between',
  flexDirection: 'row'
},
inputcol2: {
  flex: 0.5,
  //justifyContent: 'space-between',
  flexDirection: 'row'
},
 container: {
    flex: 1,
    //justifyContent: "center",
    //paddingHorizontal: 0,
    backgroundColor: 'white',
  },
 button: {
    flex: 1,
    width: "100%",
    height: "100%",
    //margin: 3,
    alignItems: "center",
    backgroundColor: "#a9a9a9",
    //padding: 3,
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
basetext1:{
 fontSize: 17,
 fontWeight: "normal",
 textAlign: 'left',
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

