var express = require('express');
var router = express.Router();

var firebase = require("firebase");
var admin = require("firebase-admin");

var serviceAccount = require("../notificaciones-github-6e24ead0d691.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://notificaciones-github.firebaseio.com"
});



router
  .post('/', function(req, res, next) { // Post
    console.log("Post1:", req.body.asunto);
    if(!req.body.asunto || !req.body.usuario || !req.body.usuario ){
      res
        .status(400)
        .json({ error: true, message: 'Petición incorrecta'})
    }

    var asunto = req.body.asunto;
    var db = firebase.database();
    console.log(asunto);
    var tokenDevices = db.ref("token_device").push()
    tokenDevices.set({
      token: asunto
    })

    // Colocar en firebase
    res
      .status(201)
      //.json({movie: Movie[_movie.id]})
      //.json({ error: false, message: 'Noficacion creada satisfactoriamente'})
      response.send(req.body.asunto);
  })
/*
  .get('/', function(req, res, next) {
    console.log("Post", req.body);
    res
      .status(200)
      .json({movies:_.values(Movie)})
  })
*/
/*
  .get('/:id', function(req, res, next) {
    if(req.params.id){
      res
        .status(403)
        .json({ error: true, message: 'Params empty'})
    }
    // retornar elemento correspondiente
  })*/
  .put('/:id', function(req, res, next) {
    if(!req.params.id && !req.body){
      res
        .status(403)
        .json({ error: true, message: 'Params empty'})
    }

    // Actualizacion notificacion
    res
      .status(200)
      .json({ error: false, message: 'Notificacion editada'})
  })

  .delete('/:id', function(req, res, next) {
    if(!req.params.id){
      res
        .status(403)
        .json({ error: true, message: 'Params empty'})
    }
    // Borrar notificacion
    res
      .status(400) // 400??
      .json({})
  })
module.exports = router;

























//
