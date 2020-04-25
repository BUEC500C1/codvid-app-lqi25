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
### Preparation
- Open the mapgoogle folder in the terminal.
- In order to install the components required by the project, you need to run the following command in the terminal：
```
npm install @react-navigation/native
npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
npm install @react-navigation/stack
npm install react-native-maps --save-exact
npm install react-native-datepicker --save
npm i react-native-elements --save
npm i --save react-native-vector-icons
react-native link react-native-vector-icons
```
- Open the android emulator and run the project:
```
npx react-native run-android
```
### Step4: On separate branch, exercise the CODVID-19 API (Documentation using postman) and display the data in your application as text.    
### Step5：Overlay the data on the maps
 
