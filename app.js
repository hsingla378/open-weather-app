const { json } = require("body-parser")
const express = require("express")

const app = express()
const https = require("https")

app.get("/", function(req, res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Sirsa&appid=54033f0864dc6ac6da9c0e8af059c847&units=metric"

    https.get(url, function(response){
        console.log(response.statusCode)

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            // console.log(description)
            res.send(`current weather in sirsa: ${description}`)
        })
    })
})



app.listen(3000, function(){
    console.log("Server is running on port 3000")
})