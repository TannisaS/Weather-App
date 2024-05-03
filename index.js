import express from "express";
import axios from "axios";
import bodyparser from "body-parser";
const app=express();
const port=3000;
const url="https://api.api-ninjas.com/v1/weather?city=";
const key="itrj4jA8hKL9VRUUOL5Olw==VAyHA9YDVLKoU6iD";
const config={
    headers:{
        'X-Api-Key': `${key}`,
    },
};
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('styles'));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});
app.post("/get-weather", async(req,res)=>{
    const city=req.body.city;
    console.log(city);
    //console.log((await axios.get(url+"?city="+city,config)).data.main.temp);
    try{
        const result=await axios.get(url+city,config);
        console.log(result.data.temp);
        res.render("index.ejs",{
            cityy:city,
            content:result.data,           
        });
    }
    catch (error){
        res.render("index.ejs",{
            error:"Information of this location isn't in our database"
        })
    }
});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

