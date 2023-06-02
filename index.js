//Dependencies
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const app = express();

//Routes
const empleado = require('./routes/empleado');
const user = require('./routes/user');

//Middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
//const cors = require('./middleware/cors');

//Use
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', index);
app.use('/user', user);
app.use(auth);
app.use('/empleado', empleado);
app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port 3000");
    }
);