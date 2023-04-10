import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeValue: new Animated.Value(0),
      yValue: new Animated.Value(0),
      xValue: new Animated.Value(0),
      springValue: new Animated.Value(0.5),
      rotateValue: new Animated.Value(0)
    }
  }

  _fadeAnimation = () => {
    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 1200,
    }).start()
  }

  _springAnimation = () => {
    Animated.spring(this.state.springValue, {
      toValue: 1.5,
      friction: 1
    }).start()
  }

  _moveYAnimation = () => {
    Animated.timing(this.state.yValue, {
      toValue: height/3,
      duration: 1000,
      easing: Easing.linear
    }).start(() => {
      Animated.timing(this.state.yValue, {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear
      }).start(() => {
        this._moveYAnimation()
      })
    })
  }

  _moveXAnimation = () => {
    Animated.timing(this.state.xValue, {
      toValue: width - 100,
      duration: 6000,
      easing: Easing.linear
    }).start(() => {
      Animated.timing(this.state.xValue, {
        toValue: 0,
        duration: 6000,
        easing: Easing.linear
      }).start(() => {
        this._moveXAnimation()
      })
    })
  }

  _rotateAnimation = () => {
    Animated.sequence([
      Animated.timing(this.state.rotateValue, {
        toValue: 100,
        duration: 1000,
        easing: Easing.linear
      }),
      Animated.timing(this.state.rotateValue, {
        toValue: 0,
        duration: 0,
      }),
    ]).start(() => {
      this._rotateAnimation()
    })
  }

  _moveAndRotateAnimation = () => {
    Animated.parallel([
      this._moveYAnimation(),
      this._moveXAnimation(),
      this._rotateAnimation()
    ]).start()
  }

  render() {
    const interpolatedRotateAnimation = this.state.rotateValue.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '360deg'],
    })
    return (
      <View style={styles.container}>
       <TouchableOpacity
        style={styles.button}
        onPress={this._moveAndRotateAnimation}
        >
        <Text style={styles.buttonText} >Animate</Text>
      </TouchableOpacity>
      <Animated.Image 
        source={require('../assets/images/ball.png')}
        style={[
          styles.imageView,
          // {opacity: this.state.fadeValue},
          {top: this.state.yValue},
          {left: this.state.xValue},
          // { transform: [{scale: this.state.springValue}], alignSelf: 'center'}
          {transform: [{rotate: interpolatedRotateAnimation}]}
        ]}>
      </Animated.Image>
     
      </View>
    );
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imageView: {
    width: 100,
    height: 100,
  },
  button: {
    backgroundColor: 'steelblue',
    height: 45,
    marginTop: 20,
    alignSelf: 'center'
  },
  buttonText: {
    color: 'white',
    padding: 12,
    paddingHorizontal: 20
  }
});
