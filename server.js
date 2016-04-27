const express= require('express');
const bodyParser=require('body-parser');
const app=express();
const MongoClient= require('mongodb').MongoClient;
var __dirname= '/CRUD';


MongoClient.connect('mongodb://kenyi:easytaxi@ds021741.mlab.com:21741/easy-taxi-user',(err,database)=>{
    if (err) return console.log(err)
    db= database    
    app.listen(3000,function () {
    console.log('listening on 3000')
})
})


app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine','ejs')
app.use(express.static('public'))

app.use(bodyParser.json())

console.log('may the node be with you')

app.get('/',(req,res)=> {
   // res.sendFile(__dirname +'/index.html' )
    db.collection('quotes').find().toArray(function(err,results){
     if(err) return console.log(err)
     res.render('index.ejs',{quotes:results}) 
    })
    
})

app.post('/quotes',(req,res)=> {
    db.collection('quotes').save(req.body,(err,result)=>{
        if(err) return console.log(err)
        console.log(req.body)
        console.log('saved to database papu ')
        
        res.redirect('/')
    })
    
})

app.put('/quotes', (req, res) => {
 db.collection('quotes')
  .findOneAndUpdate({id: req.body.name}, {
    $set: {
      id: req.body.id,
      name: req.body.name,
      lastname: req.body.lastname,
      date: req.body.date,
      state: req.body.state
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  }) 
})

app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({id: req.body.name},
   (err, result) => {
    if (err) return res.send(500, err)
    console.log(req.body.name)
    console.log(result)
    res.send('Se elimino el registro')
  })
})

