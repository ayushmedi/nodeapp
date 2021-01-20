
const express = require('express')
const app = express()
const port = 3000

//this should be above the routes
app.use(express.json());
app.use(express.urlencoded());

var users = []; //our database


var sampleJson= {
  "user" : {
    "username" : "ayush",
    "id" : 123
  }
}

var sampleJson1= {
  "user" : {
    "username" : "ramukaka",
    "id" : 124
  }
}




app.get('/users', (req, res) => {
          
           res.status(200).json(JSON.stringify(users)) //what is users is empty or null?? check
            //this sends as application/json
 })

app.get('/user/:id',(request,response) => {

          findUserIdIndex(users, request.params.id);
          if(i == -1) {
            response.status(200).json(null);
          }
          else {
            response.status(200).json(users[i]);
          }
          
})

app.post('/user',(request,response) => {
          var jsonString = JSON.stringify(request.body)
          users.push(request.body)
          response.send('User details: ' + jsonString) 
})

app.put('/user',(request,response) => {

            var json =  JSON.parse(JSON.stringify(request.body));
            console.log(data["user"].id)
            i = findUserIdIndex(users, json["user"].id)
            console.log('i=' + i)
            if(i == -1) {
              response.status(404).json(null);
            }
            else {
              users[i] = json;
              response.status(200).json(JSON.stringify(users))
            }
})

app.listen(port, () => {
           console.log(`Example app listening at http://localhost:${port}`)
})


/**
 * Return index of the user id in the users array
 * @param {*} users 
 * @param {*} id 
 */
function findUserIdIndex(users, id) {
  for(i=0; i<users.length; i++) {
      var json = JSON.parse(JSON.stringify(users[i]))
      console.log(json)
      if(json["user"].id == id) {
            console.log('found')
            return i;
      }
  }
  console.log('not found')
  return -1;
}