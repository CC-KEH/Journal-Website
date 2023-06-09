//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const homestarter = "Lorem ipsum, dolor sit amet consectetur adipisicing asjkdaskljdh Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed labore nihil non voluptatibus adipisci quam molestiae ex explicabo natus nam illum enim, odit, ratione debitis culpa, cupiditate obcaecati corrupti architecto aliquid. Mollitia debitis itaque aliquam, nam quidem minus blanditiis nesciunt quasi voluptas, vel perspiciatis praesentium facilis expedita ad, voluptatum atque?";
var posts = [];

const app = express()
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/',(req,res)=>{
    res.render('home',{starter:homestarter});
});

app.get('/write',(req,res)=>{
    res.render('compose');
});

app.post('/write',(req,res)=>{
    const post = {
        title: req.body.highlight,
        content: req.body.textArea    
    }
    console.log(post)
    posts.push(post);
    res.redirect('/');
});

app.listen(4000,()=>{console.log('Listening on port 4000')});