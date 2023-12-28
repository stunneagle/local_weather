// eslint-disable-next-line no-unused-vars
import styles from './App.module.css';
import WeatherDisplay from './components/WeatherDisplay/weatherdisplay';
import React from 'react';
import logo from './logo.svg'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: null,
      location: {
          city: '',
          country: ''
      },
      description: '',
      feelsLike: null,
      humidity: null,
      pressure: null,
      windSpeed: null,
      units: {
          temperature: 'C',
          windSpeed: 'Mph',
          feelsLike: 'C',
      },
      activeTemperatureButton: 'C', // Track the active temperature button
      activeWindSpeedButton: 'Mph', // Track the active wind speed button
 

  };
  }

  componentDidMount(){
    // Fetch weather  data when the component mounts
    this.getWeather();
}
getWeather(){
  //Use browser's geolocation to get the user's location
  navigator.geolocation.getCurrentPosition(
      (position) =>{
          const { latitude, longitude } = position.coords;

          //Call OpenWeatherMap API to get weather data
          const apiKey = '51ffb2cb1a76c773be9d590e6fa77ee2';
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
          
          fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
              this.setState({
                  location: { 
                      city: data.name,
                      country: data.sys.country,
                  },
                  temperature: data.main.temp,
                  description: data.weather[0].description,
                  feelsLike: data.main.feels_like,
                  humidity: data.main.humidity,
                  pressure: data.main.pressure,
                  windSpeed: data.wind.speed,
              });
          })
          .catch((error) => console.error('Error fetching weather data', error))
          },
          (error) => {
            console.error('Error getting location:', error);
          this.setState({ error: 'Unable to retrieve your location. Please check your location settings in your mobile or browser. Otherwise, a browser update could be necessary.' });
        }
  
  );
  
}

toggleTemperatureUnit = (unit) => {
  this.setState((prevState) => ({
      units : {
          ...prevState.units,
          temperature: unit,
          feelsLike: unit,
         
           },
           activeTemperatureButton: unit,
  }));
};

toggleWindSpeedUnit = (unit) => {
  this.setState((prevState) => ({
      units : {
          ...prevState.units,
          windSpeed: unit,
              },
      activeWindSpeedButton: unit,
  }));
};

 toFahrenheit = (celsius) => ((celsius * 9) / 5 + 32).toFixed(1);
 toKmph = (mph) => (mph * 1.60934).toFixed(1);

  render() {

    const formatDate =() => {
      const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long', 
        year: 'numeric'
      };
      const currentDate = new Date();
      return {fullDate: currentDate.toLocaleDateString('en-US', options),
              day: currentDate.toLocaleDateString('en-US',{weekday: 'long'}),
              numericDay: currentDate.getDate(),
              month: currentDate.toLocaleDateString('en-US', {month: 'long'}),
              numericMonth: currentDate.getMonth() + 1,
              year: currentDate.getFullYear()
    
    };
    };
    const { day, numericDay, month, year } = formatDate();

    const { error, location, temperature, description, feelsLike, humidity, pressure, windSpeed, units,
      activeTemperatureButton, activeWindSpeedButton,} = this.state;
    
      if(error) {
        return (
          <div >
            <div className={styles.header}>
  <img src={logo} className={styles["App-logo"]} alt="logo" />
  <h1>Local Weather App</h1>
  <h2>{day}</h2>
  <span>{month},{numericDay} {year}</span>
  <p className={styles.error}>{error}</p>
  <span className={styles["copyright"]}>&copy;2024 stunneagle &middot; Nottingham</span>
        
  </div>
            
              </div>
        )
      }
     
  return (
    <div>
        <WeatherDisplay 
        temperature={temperature}
        location={location}
        description={description}
        feelsLike={feelsLike}
        humidity={humidity}
        pressure={pressure}
        windSpeed={windSpeed}
        units={units}
        activeTemperatureButton={activeTemperatureButton}
        activeWindSpeedButton={activeWindSpeedButton}
        toFahrenheit={this.toFahrenheit}
        toKmph={this.toKmph}
        toggleTemperatureUnit={this.toggleTemperatureUnit}
        toggleWindSpeedUnit={this.toggleWindSpeedUnit}
        day = {day} 
        numericDay = {numericDay} 
        month = {month}
        year = {year}
        />
        <span className={styles["copyright"]}>&copy;2024 stunneagle &middot; Nottingham</span>
    </div>
  );
}

}

export default App;
