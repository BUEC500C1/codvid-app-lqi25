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
- Expo run on Android emulator using windows 10
  1. Install Android Studio and open helloproject project
  2. Open the AVD Manager and install the Android emulator
  3. Run the emulator before running the project
  4. Run expo start to start project
  5. Go to the metro builder and run android emulator
- Change the contents of App.js in the helloproject folder, the results are as follows：
<p align="center">   
<img src="https://github.com/BUEC500C1/codvid-app-lqi25/blob/master/img/step2_1.png"/> 
</p>  
<p align="center">   
<img src="https://github.com/BUEC500C1/codvid-app-lqi25/blob/master/img/step2_2.png"/> 
</p>  
### Step3: Develop use case to display a map.
### Step4: On separate branch, exercise the CODVID-19 API (Documentation using postman) and display the data in your application as text.    ### Step5：Overlay the data on the maps
 
