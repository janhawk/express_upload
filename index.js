const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/user', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err) => {
    if (err !== null) {
        console.log('error in this')
        console.log(err);
    } else {
        console.log('Connected to the database');
    }
});
    

// const users = [];

const multer  = require('multer');
const upload = multer({ 
    dest: 'public/uploads/'
});
//1rst lnch a server, 2nd lunch a server with handlebars, 3rd makre a formulaire <form>

const userSchema = mongoose.Schema({
    username: String,
    firstName: String,
    surname: String,
    profilPicture: String,
    created: {
        type: Date,
        default: Date.now,
    }
});//mongoose model!
const Users = mongoose.model('User', userSchema);

// const newUser = new Users({
//     userSchema
//    })

const port = 3000;
const app = express();

app.use(express.static('public')) //pour etre static pr le revoir apres!


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));
// parse application/json
// app.use(express.json());put this when its not form with upload

app.get('/', (req, res) => {
    res.render('home'); 
        
});

app.post('/upload', upload.single('image'), (req,res) => {
    console.log('POST /upload');
    console.log('POST /upload req.file', req.file);
    console.log('POST /upload req.body', req.body);
    console.log('form parameter', req.body.username); 
    const { userSchema } = req.body;

    // res.send(`Image ${req.body.username} has been uploaded <a href="/">Go Back</a>`);

    // users.push(userSchema);
   const newUser = new Users({
    username: req.body.username,
    firstName: req.body.firstName,
    surname: req.body.surname,
    profilPicture: req.body.profilPicture,
   })
newUser.save((err,userDb) => {
    console.log('err', err)
    console.log('userDb', userDb);

    if (err !== null) {
       res.send('ERROR! File not save err:', err);

        return;
    }
    res.send(`File has been saved! <a href="/">Go Back</a>`)
   });
});



app.listen(port, () => {
    console.log(`Server satrted on port: ${port}`) // to confirme that server is started on that port
});