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
### Step4: On separate branch, exercise the [CODVID-19 API](https://covid19api.com/) ([Documentation using postman](https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest)) and display the data in your application as text.[Done]
- After running the project, you can see the constantly updated global codvid-19 infection status on the main screen, including the updated time, active cases, newconfirmed cases,totalconfirmed cases,new deaths,total deaths and so on.
<p align="center">   
<img src="https://github.com/BUEC500C1/codvid-app-lqi25/blob/codvid-19/img/step4.png" /> 
</p>
   
### Step5：Overlay the data on the maps[Done]
#### Global Active Cases
- This function displays the number of active cases in each country at the selected date.
- Click the Global Active Cases button on the main screen to jump to a new screen.
- Select the time you want to search and click the SEARCH button.
- The program starts to run, it takes about one minute to complete the execution, and the map cannot be moved during the operation.
- Each marker on the map represents a country, move the map, click on the marker to get the country name and the number of active cases on the day of the search. 
- Click RETURN to return to the main screen.
<p align="center">   
<img src="https://github.com/BUEC500C1/codvid-app-lqi25/blob/codvid-19/img/one.gif"/> 
</p>
<p align="center">   
<img src="https://github.com/BUEC500C1/codvid-app-lqi25/blob/codvid-19/img/first.gif"/> 
</p>
     
#### Global Cases on Map
- This function displays the latest data on infection status in each country.
- Click the Global Cases on Map button on the main screen to jump to a new screen.
- The program takes about 40 seconds to run, and the map cannot be moved during the process.
- Each marker on the map represents a country, move the map, click on the marker to get the country name and infection status, including TotalConfirmed cases, NewConfirmed cases, TotalDeaths, NewDeaths, TotalRecovered cases and NewRecovered cases.
- Click RETURN to return to the main screen.
<p align="center">   
<img src="https://github.com/BUEC500C1/codvid-app-lqi25/blob/codvid-19/img/two.gif"/> 
</p>
<p align="center">   
<img src="https://github.com/BUEC500C1/codvid-app-lqi25/blob/codvid-19/img/second.gif"/> 
</p>
   
#### Search and Get More Information
- This function displays the infection status of the selected country and region under the selected date.
- Click the Search and Get More Informaion button on the main screen to enter a new screen.
- Select the date and location you want to search and click the SEARCH button to execute the program. After the program is executed, it will automatically jump to the area.
- The data situation is different in different countries. 
  - Some countries have data specific to provinces, such as China. Searching for China will display data for each province, or you can search for China and province names to get data for specific provinces.
  - Some countries only have national overall data, such as South-africa, so only the overall national situation will be displayed.
  - Some countries have data specific to cities, such as United-states. If the data is marked on the map, it will be too dense.Therefore, if you only search for countries or countries and provinces, Information will display a request to enter the province and the city. After clicking SEARCH, the data of the queried city will be displayed.
- Click RETURN to return to the main screen.
<p align="center">   
<img src="https://github.com/BUEC500C1/codvid-app-lqi25/blob/codvid-19/img/three.gif"/> 
</p>
