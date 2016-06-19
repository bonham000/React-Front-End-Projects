
class Root extends React.Component {
  constructor() {
    super();
    this.state = {
      currLat: '',
      currLon: '',
      city: '',
      temp: '',
      tempCategory: 'Kelvin',
      currTempK: '',
      currTempF: '',
      currTempC: '',
      weatherMain: '',
      weatherDetail: '',
      display: 'none'
    };
  }
  componentWillMount() {
    this.getLocation();
  }
  getLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
      this.setState({
        currLat: position.coords.latitude,
        currLon: position.coords.longitude
      });
      this.getWeather();
    }.bind(this));
  }
  getWeather() {
    var keyID = 'e75aa9eb22e3e903ba187251f2faa34f';
      $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + this.state.currLat + '&lon=' + this.state.currLon + '&appid=' + keyID, function(response) {
        var tempK = response.main.temp;
        var tempC = tempK - 273.15;
        var tempF = tempC * 1.8 + 32;
        this.setState({
          city: response.name,
          currTempK: (tempK).toString() + 'K',
          temp: (tempK).toString() + 'K',
          currTempF: (tempF.toFixed(2)).toString() + '°F',
          currTempC: (tempC.toFixed(2)).toString() + '°C',
          weatherMain: response.weather[0].main,
          weatherDetail: response.weather[0].description,
          display: 'block'
        });
      }.bind(this));
  }
  handleKelvin() {
    this.setState({temp: this.state.currTempK, tempCategory: "Kelvin"});
  }
  handleCelsius() {
    this.setState({temp: this.state.currTempC, tempCategory: "Celsius"});
  }
  handleFaren() {
    this.setState({temp: this.state.currTempF, tempCategory: "Faren"});
  }
  render() {
    return (
      <div>
        <h1 className = "title">Current Weather Service</h1>
        <DisplayWeather
          setKelvin = {this.handleKelvin.bind(this)}
          setFaren = {this.handleFaren.bind(this)}
          setCelsius = {this.handleCelsius.bind(this)}
          temp = {this.state.temp}
          tempCategory = {this.state.tempCategory}
          latitude = {this.state.currLat}
          longitude = {this.state.currLon}
          city = {this.state.city}
          kelvin = {this.state.currTempK}
          celsius = {this.state.currTempC}
          faren = {this.state.currTempF}
          weather = {this.state.weatherMain}
          weatherDetail = {this.state.weatherDetail}
          display = {this.state.display} />
      </div>
      );
  }
};

class DisplayWeather extends React.Component {
  weatherIcon(props) {

    var cond = this.props.weatherDetail;

    if (cond === "clear sky") {
      return <img src = "/assets/sun.png" />
    }
    else if ((cond === "few clouds") || (cond === "scattered clouds") || (cond === "broken clouds")) {
      return <img src = "/assets/clouds.png" />
    }
    else if ((cond === "shower rain") || (cond === "rain")) {
      return <img src = "/assets/rain.png" />
    }
    else if (cond === "thunderstorm") {
      return <img src = "/assets/storm.png" />
    }
    else {
      return <img src = "/assets/clouds.png" />
    }
  
  }
  styleKelvin() {
    var tempCategory = this.props.tempCategory;
    if (tempCategory === "Kelvin") {
      return {
        color: "#f94e3f"
      }
    }
    else {
      return {
        color: "#3f4040"
      }
    }
  }
  styleCelsius() {
    var tempCategory = this.props.tempCategory;
    if (tempCategory === "Celsius") {
      return {
        color: "#f94e3f"
      }
    }
    else {
      return {
        color: "#3f4040"
      }
    }
  }
  styleFaren() {
    var tempCategory = this.props.tempCategory;
    if (tempCategory === "Faren") {
      return {
        color: "#f94e3f"
      }
    }
    else {
      return {
        color: "#3f4040"
      }
    }
  }
  render() {
    var divDisplay = {
      display: this.props.display
    };
    var lat = Number(this.props.latitude).toFixed(2);
    var lon = Number(this.props.longitude).toFixed(2);
    return (
      <div style = {divDisplay} >
        <p className = "conditions">The current weather conditions are:</p>
        <p className = "weather">{this.props.weather}, {this.props.weatherDetail}</p>
        {this.weatherIcon()}
        <p className = "temperature">{this.props.temp}</p>
        <div className = "toggleTemp">
          <div><p style = {this.styleKelvin()} onClick = {this.props.setKelvin}>Kelvin</p></div>
          <div><p style = {this.styleCelsius()} onClick = {this.props.setCelsius}>Celsius</p></div>
          <div><p style = {this.styleFaren()} onClick = {this.props.setFaren}>Farenheit</p></div>
        </div>
        <div className = "data">
          <p className = "coordinates">Your coordinates are: {lat}, {lon}</p>
          <p className = "city">The nearest city is {this.props.city}.</p>
        </div>
        <div className = "credits">
          <p>Weather icons courtesy of&nbsp;
          <a target = "_blank" href = "https://twitter.com/adamwhitcroft">Adam Whitcroft's</a>&nbsp;nice&nbsp;
          <a target = "_blank" href = "http://adamwhitcroft.com/climacons/">Climacon Set</a></p>
        </div>
      </div>
      )
  }
};

ReactDOM.render(<Root />, document.getElementById('main'));