var express = require('express');
var router = express.Router();

var firebase = require("firebase");
var admin = require("firebase-admin");
var nombre_base_datos = "notifications_db"

var serviceAccount = require("../notificaciones-github-6e24ead0d691.json");

firebase.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://notificaciones-github.firebaseio.com"
});

router
  .post('/', function(req, res, next) { // Post
    //console.log("Post1:", req.body.asunto);
    if(!req.body.asunto || !req.body.usuario || !req.body.usuario ){
      res
        .status(400)
        .json({ error: true, message: 'Petición incorrecta'})
    }

    var asunto = req.body.asunto;
    var contenido = req.body.contenido;
    var usuario = req.body.usuario;
    var leido = false;
    var entregado = false;

    var db = firebase.database();
    var tokenDevices = db.ref(nombre_base_datos).push()
    tokenDevices.set({
      asunto: asunto,
      contenido: contenido,
      usuario: usuario,
      leido: leido,
      entregado: entregado
    })

    res
      .status(200)
      .json({ message: 'Notification creada satisfactoriamente'})
  })

  .put('/:id', function(req, res, next) {
    if(!req.params.id && !req.body){
      res
        .status(403)
        .json({ message: 'Params empty'})
    }

    if(!req.body.asunto || !req.body.usuario || !req.body.usuario || !req.body.leido || !req.body.entregado ){
      res
        .status(400)
        .json({message: 'Petición incorrecta'})
    }
    console.log("put:", req.body.asunto);

    var db = firebase.database();
    url_edicion = nombre_base_datos+"/"+req.params.id;
    console.log(url_edicion);
    var tokenDevices = db.ref(url_edicion)

    var asunto = req.body.asunto;
    var contenido = req.body.contenido;
    var usuario = req.body.usuario;
    var leido = false;
    var entregado = false;

    tokenDevices.set({
      asunto: asunto,
      contenido: contenido,
      usuario: usuario,
      leido: leido,
      entregado: entregado
    })

    // Actualizacion notificacion
    res
      .status(200)
      .json({ message: 'Notificacion editada satisfactoriamente'})
  })
/*
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
  })*/
module.exports = router;




/*
  .get('/', function(req, res, next) {
    console.log("Post", req.body);
    res
      .status(200)
      .json({movies:_.values(Movie)})
  })

    //.json({ error: false, message: 'Noficacion creada satisfactoriamente'})

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




















//
