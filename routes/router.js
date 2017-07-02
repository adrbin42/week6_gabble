const express = require('express');
const router = express.Router();
const models = require('../models');
const session = require('express-session');

router.use(session({
  secret:'winnerswin',
  resave: false,
  saveUninitialized: false
}));
// const message =
// const like =
// const gab =

//Render app home page
router.get('/', function(req,res){
  // models.users.findOne().then(function(user){
  //   console.log(user);
  // })

  if(req.session.user){
    res.render("index",
  {user:req.session.user});
  }else{
    res.redirect("/login");
  }
});

router.get('/login', function(req,res){
  res.render('login');
});

router.post('/login', function(req,res){

});

router.get('/signup',function(req,res){
  res.render('signup');
});

router.post('/signup',function(req,res,next){
  const user = models.users.build({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password
  });
  
  user.save().then(function(newUser){
    console.log(newUser);
  });

  req.session.user = user;
  res.render("sign up works","login");
});

router.get('/newgab', function(req,res){
  res.render('newgab');
});

router.get('/likes', function(req,res){
  res.render('likes');
});

module.exports = router;
