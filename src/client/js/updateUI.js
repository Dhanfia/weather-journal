const updateUI = (data) => {
    document.getElementById('image').src = data.imageUrl;
    document.getElementById('days').innerHTML = `${data.name}, ${data.countryName} is ${data.daysUntilTrip} days away`;
    document.getElementById('temp').innerHTML = `Typical weather is ${data.maxTemp || data.temp}°C with ${data.description}`;
    document.getElementById('info').innerHTML = `Do you know the currency of ${data.countryName} is ${data.currency}, their capital is ${data.capital} and they speak ${data.language}.`;
    document.getElementById('greet').innerHTML = `Enjoy your trip to ${data.name}!`;
}


export { updateUI };