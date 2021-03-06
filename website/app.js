const apiKey = '&APPID=e67c73b8c6713f05240abeaf23a4b950&units=metric';
const baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=`


const button = document.getElementById('generate');
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');

document.querySelector('#generate').addEventListener("click", performAction);

function performAction() {
  if (zip.value && feelings.value) {
    const today = new Date();
    let todaysDate = today.getMonth() + 1 + '.' + today.getDate() + '.' + today.getFullYear();
    const url = baseURL + zip.value + apiKey;
    getWeatherData(url, todaysDate);
  }
};

const getWeatherData = async (url, dateValue) => {
  const userInput = { date: dateValue, zip: zip.value,feelings: feelings.value }
  await fetch(url)
    .then(response => response.json())
    .then(data => addWeatherData("/addWeatherData", { ...data, ...userInput }))
    .then(() => getAllData())
    .catch(error => console.log(`Error: ${error}`));
};

const addWeatherData = (url, data) => {
  fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(error => console.log(`Error: ${error}`));
};

const getAllData = async () => {
  await fetch('/allWeatherData')
    .then(response => response.json())
    .then(data => updateUI(data))
    .catch(error => console.log(`Error: ${error}`));
};

const updateUI = (data) => {
  document.getElementById('entryHolder').classList.add("show");
  document.getElementById('date').innerHTML = `Date: ${data.date}`;
  document.getElementById('city').innerHTML = `City: ${data.name}`;
  document.getElementById('temp').innerHTML = `Temperature: ${Math.ceil(data.main.temp)}°C`;
  document.getElementById('description').innerHTML = `Description: ${data.weather[0].description}`;
  document.getElementById('content').innerHTML = `My feelings: ${data.feelings}`;
}
