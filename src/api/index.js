import axios from 'axios';


export const getPlacesData = async (sw,ne) => {
  try {
    const response = await axios.get('https://travel-advisor.p.rapidapi.com/hotels/list-in-boundary', {params: {
      bl_latitude: sw.lat,
      bl_longitude: sw.lng,
      tr_longitude: ne.lng,
      tr_latitude: ne.lat,
     
    },
    headers: {
      'x-rapidapi-key': 'e839f41b84msha7283f28332cd71p12ebcdjsnfdfac7c464c3',
      'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
    }})
      
    return response.data.data;
  } 
  catch (error) {
    console.log(error);
  }
};
