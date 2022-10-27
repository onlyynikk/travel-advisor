import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
} from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PhoneIcon from '@material-ui/icons/Phone'
import Rating from '@material-ui/lab/Rating'

import useStyle from './styles'
// import Phone from '@material-ui/icons/Phone'

const PlaceDetails = ({ place, selected, refProp }) => {
  //place is the props that comes from list.js-->app.js

  const classes = useStyle()

  if (selected)
    refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: '250px' }}
        image={
          place.photo
            ? place.photo.images.large.url
            : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
        } //checks whether the restaurant contains a photo (that comes in api --> console.log(place)) if yes it display it else random image is displayed
        title={place.name}
      />

      <CardContent>
        {/* card of individual Restaurant */}
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>

        {/* rating */}
        <Box display="flex" justifyContent="space-between">
          <Rating size="large" value={Number(place.rating)} readOnly />
          <Typography gutterBottom variant="subtitle1">
            Out of {place.num_reviews} reviews
          </Typography>
        </Box>

        {/* price level */}
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price}
          </Typography>
        </Box>

        {/* ranking level  */}
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.ranking}
          </Typography>
        </Box>

        {/* the ?. method check only for those restaurant which have awards  */}
        {/* the normal . method check every item and gives a error if one of them is missing */}
        {place?.awards?.map((award) => (
          <Box
            key={uuidv4()}
            my={1}
            display="flex"
            alignitem="center"
            justifyContent="space-between"
          >
            {/* displays the award */}
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}

        {/* ?. method check for the cuisines of the restaurant */}
        {/* chips in material ui are small info box */}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}

        {/* ?. method check for address */}
        {place?.address && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <LocationOnIcon /> {place.address}
          </Typography>
        )}

        {/* ?. method check for phone number and display them */}
        {place?.phone && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.spacing}
          >
            <PhoneIcon /> {place.phone}
          </Typography>
        )}

        {/* cardAction are use with button in material ui */}
        <CardActions>
          {/* this button takes you to the trip advisor page of the restaurant */}
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.web_url, '_blank')}
          >
            Trip Advisor
          </Button>

          {/* this button takes you to the website page of the restaurant */}
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.website, '_blank')}
          >
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default PlaceDetails
