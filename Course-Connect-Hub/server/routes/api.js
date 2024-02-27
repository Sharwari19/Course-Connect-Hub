const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const db = "_________";

/*
mongoose.connect(db, function(err){
    if(err){
        console.error('Error! ' + err)
    } else {
      console.log('Connected to mongodb')      
    }
});
*/

function verifyToken(req, res, next) 
{
  if(!req.headers.authorization) 
  {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') 
  {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) 
  {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

router.get('/events', (req,res) => {
  let events = [
    {
      "_id": "1",
      "name": "Web Development",
      "description": "6 months",
      "Teacher": "Free Code Camp Faculty"
    },
    {
      "_id": "2",
      "name": "Python : Machine Learning",
      "description": "5 months",
      "Teacher": "Teach With Tim"
    },
    {
      "_id": "3",
      "name": "Machine Learning",
      "description": "3.5 months",
      "Teacher": "Lane Dave"
    },
    {
      "_id": "4",
      "name": "GoLang",
      "description": "3 months",
      "Teacher": "Mosh Hemadani"
    },
    {
      "_id": "5",
      "name": "Swift",
      "description": "3 months",
      "Teacher": "Sean Allean"
    },
    {
      "_id": "6",
      "name": "Android Programming",
      "description": "6 months",
      "Teacher": "Code With Harry"
    }
  ]
  res.json(events)
})

router.get('/special', verifyToken, (req, res) => {
  let specialEvents = [
    {
      "_id": "1",
      "name": "IOT Seminar",
      "description": "3 Days",
      "Teacher": "Free Code Camp"
    },
    {
      "_id": "2",
      "name": "IOS Internals",
      "description": "3 Days",
      "Teacher": "Swapnil Mane"
    },
    {
      "_id": "3",
      "name": "Operating System Internals",
      "description": "3 Days",
      "Teacher": "Kunal Khushwaha"
    },
    {
      "_id": "4",
      "name": "All About Job Hunting",
      "description": "3 Days",
      "Teacher": "Free Code Camp"
    },
    {
      "_id": "5",
      "name": "Embedded Programming",
      "description": "3 Days",
      "Teacher": "TeachVedas"
    }
  ]
  res.json(specialEvents)
})

router.post('/login', (req, res) => {
    let userData = req.body
    
    if ((userData.email == "Marvellous") && (userData.password == "Marvellous")) 
    {
      let payload = {subject: 1}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})   
    } 
    else 
    {
        res.status(401).send('Invalid Password')
    } 
})

module.exports = router;