
export async function getRandomGiphy() {
   let url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.VUE_APP_GIPHY_API_KEY}`;

   const response = await fetch(url);
   const json = await response.json();
   return json.data;
}
