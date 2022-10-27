import axios from 'axios'

// const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'
//travel advisor --> rapid api

export const getPlacesData = async (type, sw, ne) => {
  //sw , ne come as props from --> app.js
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat, //bottom left position
          tr_latitude: ne.lat, //top right position
          bl_longitude: sw.lng, //bottom right position
          tr_longitude: ne.lng, //top right position
          //get the location of all the hotels from the visible map(which you look at the screen)
        },
        headers: {
          'X-RapidAPI-Key':
            'e94847f6f7msh16fcacf9d8cf9b2p18fe0bjsn88b97ec093ce',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        },
        //check the rapid api for the details of how to implement the travel advisor api
      },
    )
    return data //data is an array which contains objects ---> hotels etc
  } catch (error) {
    console.log(error)
  }
}
