var express = require('express');
var router = express.Router();

// Firebase
var firebase = require("firebase");
var admin = require("firebase-admin");
var db_firebase = "notifications_db"

var serviceAccount = require("../notificaciones-github-6e24ead0d691.json");

firebase.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://notificaciones-github.firebaseio.com"
});

router
  .post('/', function(req, res, next) { // Post
    console.log("Post1:", req.body);
    if(!req.body.id_user || !req.body.subject || !req.body.content ){
      res
        .status(400)
        .json({ message: 'Bad Request', code: 400, description: 'Peticion incorrecta' })
    }

    var subject = req.body.subject;
    var content = req.body.content;
    var id_user = req.body.id_user;
    var read = false;
    var delivered = false;

    var db = firebase.database();
    var tokenDevices = db.ref(db_firebase).push()
    tokenDevices.set({
      subject: subject,
      content: content,
      id_user: id_user,
      read: read,
      delivered: delivered
    })
    console.log(tokenDevices);
    res
      .status(201)
      .json({ description: 'Created', code:201})
  })

  .put('/:id', function(req, res, next) {
    if( !req.params.id && !req.body ){
      res
        .status(403)
        .json({ message: 'Params empty'})
    }

    if( !req.body.subject || !req.body.content || !req.body.read || !req.body.delivered ){
      res
        .status(400)
        .json({ message: 'Bad Request', code: 400, description: 'Peticion incorrecta' })
    }

    var db = firebase.database();
    url_edicion = db_firebase+"/"+req.params.id_notification;
    var tokenDevices = db.ref(url_edicion)

    var subject = req.body.subject;
    var content = req.body.content;
    var read = req.body.read;
    var delivered = req.body.delivered;

    tokenDevices.set({
      subject: subject,
      content: content,
      read: read,
      delivered: delivered
    })

    res
      .status(204)
      .json({ description: 'No Content', code:204})
  })

module.exports = router;
