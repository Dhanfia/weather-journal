async function performAction(event) {
  event.preventDefault();
  const city = document.getElementById('city').value;
  const start = document.getElementById('start').value;

  const today = new Date();
  const startDate = new Date(start);
  const timeUntilTrip = startDate.getTime() - today.getTime();
  var daysUntilTrip = Math.ceil(timeUntilTrip / (1000 * 3600 * 24));

  console.log(today);
  console.log(startDate);
  console.log(daysUntilTrip);
  console.log(city);

  if (city) {

    let cityName = removeSpace(city);
    let data = { city, cityName, start, daysUntilTrip };
    console.log(cityName);

    await postData(`http://localhost:8081/geonamesData`, data);
    await getData(`http://localhost:8081/countryInfo`);
    await getData(`http://localhost:8081/image`)
    await getData(`http://localhost:8081/weatherbitData`);

    const allApiData = await getData(`http://localhost:8081/allApiData`);
    console.log(allApiData);
    Client.updateUI(allApiData);

  } else {
    alert("Please enter a valid location");
  }
}

const getData = async (url) => {
  const options = {
    method: 'GET',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await fetch(url, options);
  try {
    const data = await response.json();
    return data;
  }
  catch {
    console.log(`Error: ${response.statusText}`)
  }
}

const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

const removeSpace = (string) => {
  let regExp = new RegExp(' ', 'g')
  let formattedString = string.replace(regExp, '+');
  return formattedString;
}

export { performAction };