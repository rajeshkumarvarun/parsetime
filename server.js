const app = require('express')();
// @params Environment Configurable variable

const dotenv = require('dotenv').config();
const moment = require('moment');
var json = require('./neurontask.json');

app.get(`/api/parsetime`, (req, res) => {
   
       
    //@{query Params}  
    req.query.time = Number(req.query.time);  
    
    // req.query.time =  Date.now() - 24*60*60*1000
    //   req.query.time = Date.now();

 // @params {json Key vaue} Check it is present in json or not
if(!json[`${req.query.tz}`]){ 
   return res.json({error:true, message: "please Provide a valid Time zone"});
}

// @params Json Value to format utc Value
        var utc_json_value = json[`${req.query.tz}`];
      if(utc_json_value.substring(5,6) =='+')
      {
          console.log("add");
        var mt = moment(req.query.time).add({hours:utc_json_value.substring(6,7),minutes: utc_json_value.substring(8,10)});
     }
     if(utc_json_value.substring(5,6) == '-'){
         console.log("subtract");
        var mt = moment(req.query.time).add({hours:utc_json_value.substring(6,7),minutes: utc_json_value.substring(8,10)});
        
    }
    var response_obj = {};
  
   response_obj.time = mt.format('YYYY-MM-DD')+' '+mt.format('HH:MM:SS');

    console.log(mt.format('YYYY-MM-DD'),' ',mt.format('HH:MM:SS'));
              res.json(response_obj);
});


// Error Handler 
app.use((req, res) => {
    res.status(404).send({error:true, message: "Page Not Found"});
});
// server isssue
app.use((req, res) => {
    res.status(500).send({error:true, message: "Page Not Found"});
});


// { "time": "2016-14-6 17:04:48" }


console.log('Your app running on PORT', process.env.PORT);



app.listen(process.env.PORT);

