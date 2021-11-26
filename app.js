const express = require('express');
const https=require('https');
const bodyParser=require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const query=req.body.cityName;
    const apikey="eebc57962bc56363a3939195958c4bce";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp; 
            const weatherDes=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imgUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>The Weather is currently "+weatherDes+"</p>");
            res.write("<h1>The temperature in "+query+" is "+temp+" degree Celcius.</h1>");
            res.write("<img src="+imgUrl+">")
            res.send();
        })
    })
})
app.listen(3000,function(){
    console.log("Server active on : http://localhost:3000/")
});