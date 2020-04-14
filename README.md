# codvid-app-lqi25
## Requirements
### Use [CODVID-19 API](https://covid19api.com/) ([Documentation using postman](https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest)) to build mobile application that displays:
  - CODVID cases per country on a MAP
  - CODVID cases per country Live on a MAP (changes)
  - CODVID cases per country based on a date.
  - Summary of total cases for the world
  - Live Summary for the World
### Stretch goal:
  - Display data per Province
  - User can put their address and track CODVID-19 in their neighborhood (Only in countries where regional data is provided)
 
## Steps
### Step1：Setup your REACT Native Environment[Done]
- Install [Node 12 LTS](https://nodejs.org/en/download/)
- Open terminal,use npm to install the Expo CLI command line utility
```
npm install -g expo-cli
```
- Create a new project and start a development server
```
expo init helloproject
cd helloproject
npm start
```
### Step2：Go through REACT native Tutorial[Done]
- React-native run on Android emulator using windows 10
- Change the contents of App.js in the helloproject folder, the results are as follows：
<p align="center">   
<img src="https://github.com/BUEC500C1/codvid-app-lqi25/blob/master/img/step2_1.png" width="300" height="630"/> 
</p>  
<p align="center">   
<img src="https://github.com/BUEC500C1/codvid-app-lqi25/blob/master/img/step2_3.png" width="300" height="630"/> 
</p>  
<p align="center">   
<img src="https://github.com/BUEC500C1/codvid-app-lqi25/blob/master/img/step2_2.png" width="300" height="630"/> 
</p>        
   
### Step3: Develop use case to [display a map](https://github.com/react-native-community/react-native-maps)[Done]
- Install the React Native and create a project named mapgoogle.Run the app with Android emulator
```
npm install -g react-native-cli
react-native init ReactNativeMaps
react-native run-ios
```
- Install react-native-map and link it to my app
```
npm install --save react-native-maps
react-native link react-native-maps
```
- Follow the [tutorial](https://github.com/react-native-community/react-native-maps/blob/master/docs/installation.md) to create the app and run it with the following command
```
npx react-native android-run
```
<p align="center">   
<img src="https://github.com/BUEC500C1/codvid-app-lqi25/blob/master/img/step32.png" width="300" height="630"/> 
</p> 

### Step4: On separate branch, exercise the CODVID-19 API (Documentation using postman) and display the data in your application as text.    
### Step5：Overlay the data on the maps
 
