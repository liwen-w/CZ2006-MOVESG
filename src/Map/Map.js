 import React, {Component} from 'react'
import Geocode from "react-geocode";
import { GoogleMap, LoadScript, KmlLayer, DirectionsService, DirectionsRenderer, Autocomplete, DistanceMatrixService} from '@react-google-maps/api';
import './Map.css';
//const google = window.google;
Geocode.setLanguage("en");
Geocode.setApiKey("AIzaSyD2dx7c7xhsWTdcSkDnt8YgNZdVVc2LGbw");
class Map extends Component {
  constructor (props) {
    super(props)

    this.state = { 
      response: null, 
      travelMode: 'WALKING', 
      origin: '', 
      destination: '' ,
      distance: '',
      control: true
    } 
    this.directionsCallback = this.directionsCallback.bind(this) 
    this.checkBicycling = this.checkBicycling.bind(this) 
    this.checkTransit = this.checkTransit.bind(this) 
    this.checkWalking = this.checkWalking.bind(this) 
    this.getOrigin = this.getOrigin.bind(this) 
    this.getDestination = this.getDestination.bind(this) 
    this.onClick = this.onClick.bind(this) 
    this.onMapClick = this.onMapClick.bind(this) 
    this.autocomplete = null
    this.onLoad = this.onLoad.bind(this)
    this.onPlaceChanged = this.onPlaceChanged.bind(this)
    this.geocode = this.geocode.bind(this)
    this.distanceCallback = this.distanceCallback.bind(this)
  

    // this.formUpdate = this.formUpdate.bind(this)

    this.add = this.add.bind(this)

  }

  // formUpdate(e){
  //   this.setState({
  //     response: e.target.value,
  //     travelMode: 'DRIVING',
  //     origin: '',
  //     destination: ''})
  // }

  onLoad (autocomplete) {
    console.log('autocomplete: ', autocomplete)

    this.autocomplete = autocomplete
  }

  onPlaceChanged () {
    if (this.autocomplete !== null) {
      console.log(this.autocomplete.getPlace())
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  directionsCallback (response) { 
    console.log(response) 
 
    if (response !== null) { 
      if (response.status === 'OK') { 
        this.setState( 
          () => ({ 
            response 
          }) 
        ) 
      } else { 
        console.log('response: ', response) 
      } 
    } 
  } 

  distanceCallback = (response) => {
    console.log(response);
    if (response !== null) {
      if (response.status === "OK") {
        this.setState(() => ({
          distance: response.rows[0].elements[0].distance.text,
        }));
      } else {
        console.log("response: ", response);
      }
    }
  };

  checkBicycling ({ target: { checked } }) { 
    checked && 
      this.setState( 
        () => ({ 
          travelMode: 'BICYCLING' 
        }) 
      ) 
  } 
 
  checkTransit ({ target: { checked } }) { 
    checked && 
      this.setState( 
        () => ({ 
          travelMode: 'TRANSIT' 
        }) 
      ) 
  } 
 
  checkWalking ({ target: { checked } }) { 
    checked && 
      this.setState( 
        () => ({ 
          travelMode: 'WALKING' 
        }) 
      ) 
  } 
 
  getOrigin (ref) { 
    this.origin = ref 
  } 
 
  getDestination (ref) { 
    this.destination = ref 
  } 

  getDistance (ref) {
    this.distance = ref
  }
 
  onClick () { 
    console.log('on click')
    console.log(this.destination.value)
    console.log([this.geocode(this.destination.value)])
    if (this.origin.value !== '' && this.destination.value !== '') { 
      console.log(this.distance)
      this.setState( 
        () => ({ 
          origin: this.origin.value, 
          destination: this.destination.value,
          distance: this.distance,
        }) 
      )
       
    }
  } 
 
  onMapClick (...args) { 
    console.log('onClick args: ', args) 
  } 

  /*
  geocodeAddress(addressResult) {
    var geocoder = new google.maps.Geocoder();
    console.log(addressResult[0]);
    var address1 = addressResult[0];
    geocoder.geocode({ 'address': address1 }, (results, status)=> {
      if (status !== 'OK') {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  getDistanceMatrix(){
    var service = new google.maps.DistanceMatrixService;
    var orig = this.state.origin;
    var dest = this.state.dest;
    service.getDistanceMatrix({
      origins: [orig],
      destinations: [dest],
      travelMode: 'WALKING',
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, 
    (response, status) => {
      if (status !== 'OK') { 
        alert('Error was: ' + status);
      } else {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;
        this.geocodeAddress(origins);
        this.geocodeAddress(destinations);
        for (var i = 0; i < origins.length; i++) {
          var results = response.rows[i].elements;
          console.log(response);
          for (var j = 0; j < results.length; j++) {
            var element = results[j];
            console.log(element);
            var distanceString = element.distance.text;
            var durationString = element.duration.text;
            //add new value to the previousValue 
            this.setState ({
              distance:  distanceString
            });
            this.setState ({
              duration: durationString
            });
          }
          console.log(this.state.distance + ','+ this.state.duration)
        }
      }
    });  
  }
  */

  geocode(address) {
    let coords;
    Geocode.fromAddress(address).then(
      (response) => {
        //console.log(response)
        coords = response.results[0].geometry.location;
        console.log(coords);
      }
    );
    return coords;
  }

  add = (e) => {
    e.preventDefault();
    if(this.state.origin===""){
        // alert("please fill origin");
        return;
    }
    this.props.addFavouriteHandler(this.state);
    this.setState({origin:""});
    console.log(this.state);
  }
 
  /*
  Locate () {
    return (
      <button
        className="locate"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState(
                origin={ 
                  lat: position.coords.latitude, 
                  lng: position.coords.longtitude 
                } 
              );
            },
            () => null
          );
        }}
      >
        <img src="/compass.svg" alt="compass" />
      </button>
    );
  }
  */

  render () {
    return (
      <LoadScript
      googleMapsApiKey="AIzaSyD2dx7c7xhsWTdcSkDnt8YgNZdVVc2LGbw"
      libraries={["places"]}
      >
        <div className='map'> 
          <div className='map-settings'>  
            <div className='input-address'>
              <div className ='origin' > 
                  <label htmlFor='ORIGIN'>Origin: </label> 
                  <Autocomplete
                    onLoad={this.onLoad}
                    onPlaceChanged={this.onPlaceChanged}
                  >
                    <input 
                      id='ORIGIN' 
                      className='form-control' 
                      type='text' 
                      ref={this.getOrigin}
                      value={this.state.origin}
                      onChange={(e)=>this.setState({origin:e.target.value})}
                    />
                  </Autocomplete>
                  <button onClick= {this.add}>
                    <i className ="fa-solid fa-heart" ></i>
                  </button>
              </div>
              <div className ='destination'> 
                <label htmlFor='DESTINATION'>Destination: </label> 
                <Autocomplete
                  onLoad={this.onLoad}
                  onPlaceChanged={this.onPlaceChanged}
                >
                  <input 
                    id='DESTINATION' 
                    className='form-control' 
                    type='text' 
                    ref={this.getDestination} 
                  /> 
                </Autocomplete>
              </div> 
            </div>
          </div> 
  
          <div className='filters'> 
              <div className='filter'> 
                <input 
                  id='CYCLING' 
                  className='custom-control-input' 
                  name='travelMode' 
                  type='radio' 
                  checked={this.state.travelMode === 'BICYCLING'} 
                  onChange={this.checkBicycling} 
                /> 
                <label className='custom-control-label' htmlFor='CYCLING'>Cycling</label> 
              </div> 
  
              <div className='filter'> 
                <input 
                  id='TRANSIT' 
                  className='custom-control-input' 
                  name='travelMode' 
                  type='radio' 
                  checked={this.state.travelMode === 'TRANSIT'} 
                  onChange={this.checkTransit} 
                /> 
                <label className='custom-control-label' htmlFor='TRANSIT'>Transit</label> 
              </div> 
  
              <div className='filter'> 
                <input 
                  id='WALKING' 
                  className='custom-control-input' 
                  name='travelMode' 
                  type='radio' 
                  checked={this.state.travelMode === 'WALKING'} 
                  onChange={this.checkWalking} 
                /> 
                <label className='custom-control-label'htmlFor='WALKING'>Walking</label> 
              </div> 
          </div> 
  
          <button className='search-' type='button' onClick={this.onClick}> 
              Search Route 
          </button> 
        </div> 
  
        <div className='map-container'> 
          <GoogleMap 
              mapContainerStyle={{ 
                height: '450px', 
                width: '100%' 
              }} 
              zoom={2} 
              center={{ 
                lat: 1.373222, 
                lng: 103.799584 
              }}  
          >
            { this.state.control && (
              <DistanceMatrixService
                // required 
                options={{
                  
                  destinations: [this.geocode(this.state.destination)],
                  origins: [this.geocode(this.state.origin)],
                  /*
                  destinations: [{lat: 1.430368, lng: 103.8353628}],
                  origins: [{lat: 1.4490229, lng:103.8198723}],
                  */
                  // CHANGE THE ORIGIN AND DESTINATION TO COORDS
                  travelMode: this.state.travelMode,
                }}
                callback={(res) => {
                  console.log("RESPONSE", res);
                  this.setState({
                    control: false,
                    distance: res.rows[0].elements[0].distance.text,
                  });
                }}  
              />
              )
            }
            <KmlLayer url="https://geo.data.gov.sg/bicyclerack/2021/07/12/kml/bicyclerack.kml" /> 
            <KmlLayer url="https://geo.data.gov.sg/cyclingpath/2021/07/12/kml/cyclingpath.kml" /> 
            { 
                ( 
                  this.state.destination !== '' && 
                  this.state.origin !== '' 
                ) && ( 
                  <DirectionsService 
                    // required 
                    options={{  
                      destination: this.state.destination, 
                      origin: this.state.origin, 
                      travelMode: this.state.travelMode 
                    }} 
                    // required 
                    callback={this.directionsCallback} 
                    // optional 
                    onLoad={directionsService => { 
                      console.log('DirectionsService onLoad directionsService: ', directionsService) 
                    }} 
                    // optional 
                    onUnmount={directionsService => { 
                      console.log('DirectionsService onUnmount directionsService: ', directionsService) 
                    }} 
                  />  
                )
            } 
  
            { 
                this.state.response !== null && ( 
                  <DirectionsRenderer 
                    // required 
                    options={{  
                      directions: this.state.response 
                    }} 
                    // optional 
                    onLoad={directionsRenderer => { 
                      console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer) 
                    }} 
                    // optional 
                    onUnmount={directionsRenderer => { 
                      console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer) 
                    }} 
                  /> 
                ) 
            }  
          </GoogleMap> 
        </div> 
        <div className='distance'>
          <label htmlFor="distance"> Distance: {this.state.distance}</label>
        </div>         
                
      </LoadScript> 
    ) 
  } 
} 
 
 
export default React.memo(Map)

            
