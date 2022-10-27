import React, { useEffect, useState } from 'react'
import { CssBaseline, Grid } from '@material-ui/core'

import { getPlacesData } from './api'

import Header from './components/Header/Header'
import Map from './components/Map/Map'
import List from './components/List/List'

const App = () => {
  const [places, setPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({})
  //latitude and longitutde
  const [bounds, setBounds] = useState({})
  const [childClicked, setChildClicked] = useState([null])
  //to know the card which are been clicked on the map

  const [filteredPlaces, setFilteredPlaces] = useState([])
  //filtered places according to the rating

  const [isLoading, setIsLoading] = useState(false)
  //waits for the api to search/fetch

  const [rating, setRating] = useState('')
  //selection/filter of either hotels, restaruants and attraction
  // selection/filter of rating from 0 to 4.5
  const [type, setType] = useState('restaurants')
  useEffect(() => {
    //first useeffect is only used to gain the users location and to set it as the coordinates
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude })
      },
      //take the users current location and sets it as the default coordinates(lat and lng)
    )
  }, [])

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating)
    //filters the places accorinding to the rating
    setFilteredPlaces(filteredPlaces)
  }, [rating])

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true)
      //this useeffect is use to gain the restaurant around the current coordinates
      //sw--sountwest and ne--northeast
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        //data is the resturants around the users location
        //type is also been passed to toggle between hotel, retaurant and attraction
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0))
        setFilteredPlaces([])
        setIsLoading(false)
        //sets the data of hotels recieved as places
      })
    }
    //this is rerendered every time the coordinates and bounds changes
  }, [type, bounds])

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading}
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            setType={setType}
            type={type}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            setChildClicked={setChildClicked}
            places={filteredPlaces.length ? filteredPlaces : places}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App
