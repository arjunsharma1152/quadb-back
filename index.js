const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const Items = require('./model.js');
const myModules = require('./data-func.js');

const app = express();

const DB = 'mongodb+srv://arjunsk923:qoJGnBc0URvE32jX@cluster0.hqse4r3.mongodb.net/quadb?retryWrites=true&w=majority';

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from middleware!!");
  next();
});

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => console.log("DB connection successful")
);

// GET REQUEST TO FETCH DATA FROM WAZIR API AND PUSH IT INTO THE DATABASE

app.get('/api/v1/pushdata', async (req, res) => {
  try {

  myModules.deleteData();
    
    const items = await fetch('https://api.wazirx.com/api/v2/tickers')
      .then(response => { return (response.json()) })
      .then(data => {
        const newData = Object.entries(data).slice(0, 10);
        const data_ten = [];

        for (let [key, value] of newData) {
          data_ten.push(value);
        }
        const dataImport = JSON.stringify(data_ten);
        myModules.importData(JSON.parse(dataImport));

        return data_ten;
      })
      .catch(err => console.log(err))

    res.status(200).json({
      status: 'success, items are loaded',
      items: items
    })

  } catch (err) {
    res.status(404).json({
      status: 'fail',
      error: err
    })
  }
})

// GET REQUEST TO SEND DATA FROM THE DATABASE

app.get('/api/v1/alldata',async (req,res) => {
  
    const items = await Items.find();
  
  try{    
    res.status(200).json({
        status: 'success',
        results: items.length,
        data: {items}
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      error: err
    })
  }
})


const port = 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});