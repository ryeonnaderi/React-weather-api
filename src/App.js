import React from "react";

// imports 
import Titles from "./Components/Titles";
import Form from "./Components/Form"
import Weather from "./Components/Weather"

const API_KEY = "b08ca5ecfe711f6d001286eef6653f15"; 

class App extends React.Component{
  
  state ={
    city:undefined,
    country:undefined,
    temperature:undefined,
    humidity:undefined,
    wind:undefined,
    description:undefined,
    error:undefined
  }
  getWeather = async (e) =>{
    // prevents page refresh
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    // api call
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`); 
   const data = await api_call.json();
    if(city && country){
      this.setState({
        city:data.name,
        country:data.sys.country,
        temperature:data.main.temp,
        humidity:data.main.humidity,
        wind:data.wind.speed,
        description:data.weather[0].description,
        error:""
      });
    } else{
      this.setState({
        city:undefined,
        country:undefined,
        temperature:undefined,
        humidity:undefined,
        wind:undefined,
        description:undefined,
        error:"please enter a city and country"
      });
    }
   
  }
  render(){
    return(
      <div>
         <Titles />
         <Form getWeather={this.getWeather}/>
         <Weather
          city = {this.state.city} 
          country = {this.state.country}
          temperature = {this.state.temperature}
          humidity = {this.state.humidity}
          wind = {this.state.wind}
          description = {this.state.description}
          error = {this.state.error}
          />
      </div>
    )
  }
}


export default App;