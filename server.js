/* Empty JS object to act as endpoint for all routes */
projectData = {};

// Express to run server and routes
const express = require('express');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Dependencies */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static('website'));

const port = 3000;
const server = app.listen(port, () => {
    console.log('server running'); 
    console.log(`running on localhost: ${port}`);
})

app.get('/allWeatherData', (req, res) => {
    console.log('Retrieve projectData');
    res.send(projectData);
});

// Post Route
app.post('/addWeatherData', (req, res) => {
    console.log(req.body);
    projectData = req.body;
});