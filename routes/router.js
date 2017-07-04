const express = require('express');
const router = express.Router();
const models = require('../models');
const session = require('express-session');

router.use(session({
  secret:'winnerswin',
  resave: false,
  saveUninitialized: false
}));

  let likeCount = function(req,res,next){
    models.likes.count({where:{msgid:req.body.msgid}})
    .then(function(likecount){
      res.render('index',{likecount:likecount});
      console.log('countworks');
    })
    next();
}

// Person.count({where: {name: 'someone2'}}).on('success', function(count) {
//      console.log("Counted " + count + " elements with name = someone2!")
//    })

router.use(likeCount);

//Render app home page
router.get('/', function(req,res){
  if(req.session.username){
    models.messages.findAll({include:[{model:models.users,as:'usermessages'}]})
    .then(function(messages){
      res.render('index', {messages:messages,likecount:likecount});
    });
  }else{
    res.redirect("/login");
    }
  });

router.get('/login', function(req,res){
  res.render('login');
});

router.post('/login', function(req,res){
  models.users.findOne({where:{username:req.body.username}}).then(function(user) {
    console.log(user.username);

        req.session.username = user.username;
        req.session.id = user.id;
        req.session.firstname = user.firstname;
        req.session.lastname = user.lastname;
        req.session.createdat = user.createdAt;
        res.redirect("/");

      })//end promise for finding a user
    if(req.body.username === undefined){
      res.render('login',{errors:'Invalid password and username combination.'});
    }
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
    res.render("login");
  });

});

router.get('/newgab', function(req,res){
  res.render('newgab',{user:req.session.username,userid:req.session.id});
});

router.post('/newgab', function(req,res){
  if(req.session.username){
    const newgab = models.messages.build({
      message:req.body.msgBox,
      userid:req.session.id
    });
    newgab.save().then(function(newgab){
      console.log(newgab);
      req.session.newmsg = req.body.msgBox;
      res.render('index',
      {user:req.session.username,
      newmessage:req.session.newmsg}
      );
    });
  }else{
    res.render('login');
  }
});

router.post('/user/likes', function(req,res){

    models.likes
    .findOrCreate({where:
      {msgid:req.body.msgid,
      userid:req.body.userid}})
    .spread(function(like, created){
        console.log("CREATED--- ", created);
        res.redirect('/?msgid='+req.body.msgid);
      });

  });

router.post('/msg/delete', function(req,res){
  models.messages.destroy({where:{id:req.body.delete}}).then(function(message){
    res.redirect('/');
  });
});

module.exports = router;
