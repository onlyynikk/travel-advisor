import React, { useState } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import SearchIcon from '@material-ui/icons/Search'
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core'
//material ui components

import useStyles from './styles' //customs css hoooks

const Header = ({ setCoordinates }) => {
  const classes = useStyles()
  const [autocomplete, setAutoComplete] = useState(null)

  const onLoad = (autoC) => setAutoComplete(autoC)

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat()
    const lng = autocomplete.getPlace().geometry.location.lng()
    setCoordinates({ lat, lng })
    //sets the coordinates according to the input location
  }
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Travel Advisor
        </Typography>
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            Explore new places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search..."
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
