const inputElement = document.getElementById('input');
const buttonElement = document.getElementById('searchButton');
const nameSearch = document.getElementById('name');
const countrySearch = document.getElementById('country');
const temp = document.getElementById('temp');
const description = document.getElementById('description');
const time = document.getElementById('date');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const pressure = document.getElementById('pressure');
const altTemp = document.getElementById('alt-temp');
const sunRise = document.getElementById('sunrise')
const sunSet = document.getElementById('sunset')
const imgError = document.getElementById('error')
const weatherElement = document.querySelector('.weather')
const errorImg = document.querySelector('.error-img');
const citySearch = document.querySelector('.city-img')
const cloud = document.getElementById('cloud-condition')
const apiKey = 'b8d7574c46e4895fbd06177bcf817462';

// Fetching Data from OpenWeatherMap API
//apikey: b8d7574c46e4895fbd06177bcf817462

async function fetchData(cityName){

  try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);

    const data = response.json();

    return data
  }catch(error){
    weatherElement.style.display = 'none'
    imgError.src = 'images/network-error.png'
    errorImg.style.display = 'grid'
  }
}


buttonElement.addEventListener('click', () => {
  citySearch.style.display = 'none'; 
  renderData()
})

async function renderData(){
  try{

  const city = String(inputElement.value)

  const data = await fetchData(city);

  if(!fetchData()){
    imgError.src = 'images/network-error.png'
    weatherElement.style.display = 'none'
    errorImg.style.display = 'grid'
  }


  let date = new Date(data.dt * 1000);

  //Weather Data
  
  pressure.textContent = data.main.pressure + ' hpa'
  nameSearch.textContent = data.name;
  countrySearch.textContent = data.sys.country;
  temp.textContent = Math.round(data.main.temp)+'°C';
  description.textContent = data.weather[0].description;

  const weatherCondition = await data.weather[0].main;
  

  if(weatherCondition === 'Clear'){
    cloud.src = 'images/clear.png'
  }else if(weatherCondition === 'Clouds'){
    cloud.src = 'images/cloudy.png'
  }else if(weatherCondition === 'Rain'){
    cloud.src = 'images/rain.png'
  }else if(weatherCondition === 'Drizzle'){
    cloud.src = 'images/drizzle.png'
  }else if(weatherCondition === 'Mist'){
    cloud.src = 'images/mist.png'
  }

//Todays Date

  const day = String(date.getDate()).padStart(2, '0');
  const dayName = date.toLocaleString('en-US', { weekday: 'short' }); 
  const monthName = date.toLocaleString('en-US', { month: 'long' });

  time.textContent = `${dayName} | ${monthName} ${day}`


//Sunrise At
  const rise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
});

//Sunset At

  const set = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
});

  sunRise.textContent = rise;
  sunSet.textContent = set;

  wind.textContent = data.wind.speed + ' km/h';
  humidity.textContent = data.main.humidity + '%';
  altTemp.textContent = Math.round(data.main.feels_like) + '°C'

//Error Handling
  
  errorImg.style.display = 'none'
  weatherElement.style.display = 'block'


  return data;

}catch(error){
  imgError.src = 'images/error.png'
  weatherElement.style.display = 'none'
  errorImg.style.display = 'grid'
}
}