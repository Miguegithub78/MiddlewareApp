const app = require('./app');
const mongoose = require('mongoose');

const PORT = 3001;

//Me conecto a la base de datos
const uri = "mongodb+srv://Tito:titoelbanbino@cluster0.khboe.mongodb.net/midleware"
mongoose.connect(uri);

mongoose.connection.once('open', _ => {
    console.log('Database is connected');
    app.listen(PORT, () => { console.log(`Listening in http://localhost:${PORT}/` )});
})

mongoose.connection.on('error', err => {
    console.log(err)
})

