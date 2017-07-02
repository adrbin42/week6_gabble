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
  models.users.findOne({where:{username:req.body.username}}).then(function(user) {
  let errorMsgs = [];
  console.log(authUser);
  console.log('authorized user');
  req.checkBody("username", "Please Enter a valid username.").notEmpty().isLength({min: 5, max: 20});
  req.checkBody("password", "Please Enter a Password.").notEmpty();
  req.checkBody("username", "Invalid password and username combination.").equals(user.username);
  req.checkBody("password", "Invalid password and username combination.").equals(user.password);

  let errors = req.validationErrors();
    if (errors) {
      errors.forEach(function(error) {
        errorMsgs.push(error.msg);
  });
      res.render("login", {errors: errorMsgs});
    } else {
      req.session.user = req.body.username;
      res.redirect("/");
    }
  });
});

router.get('/logout',function(req,res){
  req.session.destroy();
  res.redirect('/');
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
  res.render("login");
});

router.get('/newgab', function(req,res){
  res.render('newgab');
});

router.get('/likes', function(req,res){
  res.render('likes');
});

module.exports = router;
