import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js'
import Register from './Components/Register/Register'
import './App.css';
import Clarifai from 'clarifai'
import Signin from './Components/SignIn/SignIn'

const app = new Clarifai.App({
  apiKey: 'a02bff7274274f81851df706d0a288fa'
})

const particlesOptions = {
  particles: {
        number: {
          value: 30,
          density: {
            enable: true,
            value_area: 200
        }
    }
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image =  document.getElementById('inputimage')
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  displayFaceBox = (box) => {
    return this.setState({box: box})
  }
  
  onRouteChange = (route) => {
    if(route === "signout") {
      this.setState({isSignedIn: false})
    } else if(route === 'home') {
    this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
      .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err))  
  }
  
  render() {
   const { isSignedIn, imageUrl, route, box } = this.state
   return (
    <div className="App">
       <Particles className="particles"
            params={particlesOptions} 
        />
      <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
      { route === 'home' 
      ? <div>
          <Logo />
          <Rank />
          <ImageLinkForm 
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition imageUrl={imageUrl} box={box}/>
        </div>
        : (
          route === 'signin' ? 
          <Signin onRouteChange={this.onRouteChange}/> 
          : <Register onRouteChange={this.onRouteChange}/>
        )
        
      }
    </div>
  );
}

}

export default App