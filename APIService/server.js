
const express = require('express'),
    app = express(),
    cors = require('cors'),
    port = process.env.PORT || 4100,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    path = require("path");
const apiCountUtil = require('./api/Utilities/ApiCountHelper');
const { DB_CONNSTRING } = require('./api/Utilities/Constants');
//For Image upload via multi part content type
const upload = multer({ dest: 'assets/' })

app.get("/", express.static(path.join(__dirname, "./public")));
//To access image files via URL, image will accessed as http://locahost:/<image name>/
app.use(express.static(__dirname + '/api/assets'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(upload.single('propertyImage'))

app.use(cors());
app.use(function (err, req, res, next) {
    console.log('This is the invalid field ->', err.field)
    next(err)
})
app.use((req, res, next) => {
    if (req.url !== "/apiCount") {
        apiCountUtil.increaseAPIHit()
    }
    next();
});


var propertyRoutes = require('./api/routes/propertyRoutes'); //importing property route
var userRoutes = require('./api/routes/userRoutes'); //importing user route
var apiCountRoutes = require('./api/routes/apiCountRoutes'); //importing api Count route


//registering the route
app.use('/property', propertyRoutes);
app.use('/user', userRoutes);
app.use('/', apiCountRoutes);

async function main() {

    try {
        console.log('Attempting connection to DB');
        mongoose.connect(DB_CONNSTRING, {
            useNewUrlParser: true, useUnifiedTopology: true
        });
        app.listen(port, () => { console.log('API started successully at: ' + port) });

    } catch (e) {
        console.error(e);
    }
}
main().catch(console.error);

