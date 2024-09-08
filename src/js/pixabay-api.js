// підключення бібліотеки axios https://axios-http.com/docs/intro 
import axios from 'axios';

//3 функція вилучення  https://pixabay.com/ru/users/45653057/ 45653057-33cc59a572348b879eba9c5b0
export async function gettingData(inputSearch, pageGrowth = 1) {
 
    // базова адреса для звернень
    axios.defaults.baseURL = "https://pixabay.com";
   
   /* const myApiKey = "45653057-33cc59a572348b879eba9c5b0";
    //заголовок що однаковий для всіх запитів
    axios.defaults.headers.common["key"] = myApiKey;*/

    // console.log(axios.defaults.headers)

      const response = await axios.get(
        "/api/", {
            params: {
    key:"45653057-33cc59a572348b879eba9c5b0",
    q: `${inputSearch}`,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page: `${pageGrowth}`,
    per_page: 15,
            }
      });
    
    return response.data
}