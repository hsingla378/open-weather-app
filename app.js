const { json } = require("body-parser")
const express = require("express")
const bodyParser = require("body-parser")
const fs = require("fs")
const app = express()
const https = require("https")
const { fstat } = require("fs")
const { send } = require("process")
require("dotenv").config()

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res, next){
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req,res) =>{

    const query = req.body.cityName;
    const apiKey = process.env.API;
    const unit = "metric"

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +  "&units=" + unit

    https.get(url, function(response){
        console.log("Status code: " + response.statusCode)

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon;
            const imageUrl =  "http://openweathermap.org/img/wn/" + icon  + "@2x.png"
            res.write(`<h1>current weather in ${query}: ${description} </h1>`)
            res.write("<img src=" + imageUrl + ">")
            res.send()
        })
    })
})





app.listen(3000, function(){
    console.log("Server is running on port 3000")
})