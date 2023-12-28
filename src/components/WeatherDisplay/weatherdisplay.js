import styles from './weatherdisplay.module.css';
import logo from '../../logo.svg';
import React from 'react';

export default class WeatherDisplay extends React.Component{
            
  render(){

   
    const {
      location,
      description,
      temperature,
      units,
      feelsLike,
      windSpeed,
      pressure,
      humidity,
      toggleTemperatureUnit, 
      toggleWindSpeedUnit,
      activeTemperatureButton,
      activeWindSpeedButton,
      toFahrenheit,
      toKmph,
      day,
      numericDay,
      month, 
      year 
    } = this.props;

    return(
      
      <div className={styles.container}>

  <div className={styles.header}>
  <img src={logo} className={styles["App-logo"]} alt="logo" />
  <h1>Local Weather App</h1>
  <h2>{day}</h2>
  <span>{month},{numericDay} {year}</span>
  </div>
  
  <div className={styles["app-info"]}>
    <div className={styles["main-weather"]}>
    <div className={styles["div-center"]}>

   <span>
   <i className="fas fa-map-marker-alt"></i>
      <h2 class={styles.location}>{location.city}, {location.country}</h2>
   </span>
    
    <span> <p>{description}</p></span>
     <span>
     <div className={styles["space-evenly"]}>
        <span className={styles["bigger-text"]}><i className="fa fa-thermometer"></i>&deg;</span>
        <span className={styles["bigger-text"]}>{units.temperature === 'C' ? (temperature ? temperature.toFixed(1) : 'N/A') : toFahrenheit(temperature) }&deg;{units.temperature}</span>
        <span className={styles["bigger-text"]}><i className="fa fa-cloud"></i></span>
      </div>
     </span>

      <span>
      <div className={styles["space-evenly"]}>
        
        <span className={styles["more-info-center"]}>*Feels Like: {units.feelsLike === 'C' ? (feelsLike ? feelsLike.toFixed(1) : 'N/A') : toFahrenheit(feelsLike) }&deg;{units.feelsLike}</span>
        <span>
          <button 
          onClick={() =>toggleTemperatureUnit('C')} disabled={activeTemperatureButton === 'C'}
          className={`${styles["flip-button"]} ${styles["flip-button-left"]}`} >&deg;C</button>
          <button 
          onClick={() =>toggleTemperatureUnit('F')} disabled={activeTemperatureButton === 'F'}
          className={`${styles["flip-button"]} ${styles["flip-button-right"]}`} >&deg;F</button>
        </span>
    </div>
      </span>
      

      </div>

    </div>
    <div className={styles["more-weather"]}>
      <div className={styles["div-center"]}>
      <div className={styles["more-bg"]}>
        <div className={styles["space-between"]}>
        <span ><i className="fa fa-wind"></i> Wind speed</span>
        <span>{units.windSpeed === 'Mph' ? (windSpeed ? windSpeed.toFixed(1) : 'N/A') : toKmph(windSpeed)}{units.windSpeed}</span>
        </div>
        <div>
          <button 
          onClick={() =>toggleWindSpeedUnit('Mph')} disabled={activeWindSpeedButton === 'Mph'}
          className={`${styles["flip-button"]} ${styles["flip-button-left"]}`} >Mph</button>
          <button 
          onClick={() =>toggleWindSpeedUnit('Kmph')} disabled={activeWindSpeedButton === 'Kmph'}
          className={`${styles["flip-button"]} ${styles["flip-button-right"]}`} >Km/h</button>
        </div>
        
      </div>
     <div className={styles["more-bg"]}>
     <div className={styles["space-between"]}>
      <span><i className="fa fa-tint"></i> Humidity</span>
      
        <span>{humidity}%</span>
      </div>
     </div>
     <div className={styles["more-bg"]}>
     <div className={styles["space-between"]}>
        <span><i className="fa fa-tachometer"></i> Pressure</span>
        <span>{pressure}Pa</span>
      </div>
     </div>
      </div>
      

    </div>
  </div>
    
  </div>
  );

  }

  
   
}