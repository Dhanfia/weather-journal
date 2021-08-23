const app = require('./server.js')

const port = 8081;
const server = app.listen(port, () => {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
})
