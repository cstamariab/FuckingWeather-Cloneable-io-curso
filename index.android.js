import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar

} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchWeather } from './climaAPI';
import { frases } from './frasesAPI';
import { iconNames } from './iconsAPI';
import Highlighter from 'react-native-highlight-words';

class App extends Component {

  componentWillMount(){
    this.state = {
      hideStatusBar:false,
      temp:0,
      weather:'Default'
    
    }
  }
  componentDidMount() {
    setInterval(()=>{
      this.getLocation();
    },2000)

  }
  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (posData) => {
        fetchWeather( posData.coords.latitude , posData.coords.longitude )
          .then( res => this.setState({
            temp: Math.round(res.temp),
            weather:res.weather
          }))
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000} );
  }

  render() {

    return  (
      <View style={[styles.container,{ backgroundColor: frases[this.state.weather].background }]}>
      <StatusBar hidden={this.state.hideStatusBar}></StatusBar>
        <View style={ [styles.header,{ backgroundColor: frases[this.state.weather].background }] }>
          <Icon name={ iconNames[this.state.weather] } size={80} color={'white'} />
          <Text style={styles.temp}>{this.state.temp}°</Text>
        </View>
        <View style={styles.body}>
        <Highlighter style={styles.title}
            highlightStyle={{color: frases[this.state.weather].color}}
            searchWords={[frases[this.state.weather].highlight]}
            textToHighlight={ frases[this.state.weather].title }
          />
          <Text style={styles.subtitle}>{frases[this.state.weather].subtitle}</Text>
        </View>
      </View>
    )
  }
}

export const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFD017',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex:1,
    //backgroundColor: 'orange',
  },
  temp: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 45,
    color: 'white'
  },
  body: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flex: 5,
    //backgroundColor: 'red',
    margin:10
  },
  title: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 78,
    color: 'white',
    marginBottom:5
  },
  subtitle: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 16,
    color: 'white'
  }
})

AppRegistry.registerComponent('fuckingWeatherCloneable', () => App)