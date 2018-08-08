const express = require('express');
const mongoose = require('mongoose');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');

var User = require('./user');

var app = new express();


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/',(req,res)=>{
   // res.send('first page started');
    res.render('login');
});

app.post('/login',(req,res)=>{
 let {email,password} =req.body;
 User.findOne({email:email},(err,data)=>{
     if(data){
        let dbPassword = data.password;
        if(dbPassword===password){
            res.render('home');
           }
        else{
            res.send('incorrect password');
           }
     
     }
     else{
        res.send(`${email} is not registered account`);
        console.log('User acount not found');
     }
     
 })
});
app.post('/signup',(req,res)=>{
    var user = new User(req.body);
  user.save()
  .then((doc)=>{
      res.send(doc);
    },(e)=>{
        res.send(e);
    });
});

app.get('/signup',(req,res)=>{
    res.render('signup');
});

app.listen(3000,()=>{
    console.log('port started on 3000');
});
mongoose.connect('mongodb://localhost:27017/myweb',{useNewUrlParser: true})
.then(console.log("successfully connect to database")).catch(err => console.log(err));

