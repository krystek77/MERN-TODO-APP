const http = require('http');
const moongose = require('mongoose');
const app = require('./app');
//
const PORT = 4000;
const server = http.createServer(app);
server.listen(process.env.PORT || PORT, () => console.log(`Server running on ${PORT} port`));

//Connect to db
moongose
	.connect('mongodb+srv://atlasMern:atlasMern@mern-wwfsy.mongodb.net/test?retryWrites=true&w=majority', {
		useNewUrlParser: true,
	})
	.then(result => console.log('Connected to the database successfully'))
	.catch(error => console.log('The connection to the database failed'));
