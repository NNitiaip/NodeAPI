var request = require('request');
const open = require('open');
var fs = require('fs');
const axios = require('axios')
const express = require('express')
const store = require('./store')
const app = express()
const bodyParser = require('body-parser')
store.init()
app.use(bodyParser.json())
function setResponseHeaders(res, filename) {
  res.header('Content-disposition', 'inline; filename=data.pdf');
  res.header('Content-type', 'application/pdf');
}
app.get('/', function (req, res) {
  // setResponseHeaders(res,"")
  // res.setHeader('Content-Type', 'text/html');
  console.log(res)
  const file = `./data.pdf`;
  res.download(file);
})
app.get('/item/', (req, res) => {
  res.send({ items: store.getAllItems() })
})
app.post('/item/', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  // if (typeof req.body.item !== 'string') {
  //   console.log(req)
  //   res.status(400).end()
  //   return
  // }
  console.log(req)
  res.send("xxx").end()
  // let data = await testcall();
  // res.send(JSON.stringify(data))

 
})
app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
// testcall()
async function  testcall(){
  const url = "https://market.sec.or.th/public/idisc/FundDownload/";
let res = await axios({
  method: 'post',
  url: url,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
    
  },
  data: {
    "Symbol": "SCBS&P500FUND"
  },
  responseType: 'stream'
})
 await res.data.pipe(fs.createWriteStream("data.pdf"));

return res.data
}



    
