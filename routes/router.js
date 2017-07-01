const express = require('express');
const router = express.Router();
const models = require('../models');

//Render app home page
router.get('/', function(req,res){
  res.render('index');
});

router.get('/newgab', function(req,res){
  res.render('newgab');
});

router.get('/login', function(req,res){
  res.render('login');
});

router.get('/likes', function(req,res){
  res.render('likes');
});

module.exports = router;
