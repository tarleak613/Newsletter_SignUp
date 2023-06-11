// const express = require('express');
// const bodyParser = require("body-parser");
// const request = require('request');
// const https = require('node:https');

// const app = express();

// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({extended: true}));

// app.get("/", function(req, res){
//     res.sendFile(__dirname + "/signup.html");
// })

// app.post("/", function(req, res){

//     const firstName = req.body.fName;
//     const lastName = req.body.lName;
//     const email = req.body.email;

//     // console.log(firstName, lastName, email);
//     const data = {
//         members: [
//             {
//                 email_address: email,
//                 status: "subscribed",
//                 merge_fields: {
//                     FNAME: firstName,
//                     LNAME: lastName,
//                 } 
//             }
//         ]
//     }

//     const jsonData = JSON.stringify(data);

//     const url = "https://us9.api.mailchimp.com/3.0/lists/e31231d0ff";

//     const options = {
//         method: "POST",
//         auth : "ayush:6e36d9a2b4f45fb5d6864a0cac7b807f-us9"
//     }

//     const request = https.request(url, options, function(response){
//         response.on("data", function(data){
//             console.log(JSON.parse(data));
//         })
//     })

//     request.write(jsonData);
//     request.end();
// });





// app.listen(3000, function(){
//     console.log("Server is running on port 3000");
// });


/* from mailchimp.com 
    API KEY:    9157c9167059d8351104c0f03146cf15-us9   
                243311b56795ae7cb0c211b386c3ca5b-us9   
                6e36d9a2b4f45fb5d6864a0cac7b807f-us9     ..working
    Audience ID: e31231d0ff   e31231d0ff
*/


const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('node:https');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));

app.get("/", function(req, res){
    // res.send("The server is Live");
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    const name1st = req.body.fName;
    const name2nd = req.body.lInput;
    const email_id = req.body.email;
    // console.log(name1st);

    const data = {
        members : [
            {         //a data object with numerous values
                email_address: email_id,
                status : "subscribed",
                merge_fields: {
                    FNAME: name1st,
                    LNAME: name2nd,
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url = 'https://us9.api.mailchimp.com/3.0/lists/e31231d0ff';
    const options = {   
        method : "POST",
        auth :"ayush:6e36d9a2b4f45fb5d6864a0cac7b807f-us9" 
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.send(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});

app.post("/success", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("The server is live at 3000")
});



/* from mailchimp.com 
    API KEY: 9157c9167059d8351104c0f03146cf15-us9   243311b56795ae7cb0c211b386c3ca5b-us9   6e36d9a2b4f45fb5d6864a0cac7b807f-us9
    Audience ID: e31231d0ff   e31231d0ff
*/
