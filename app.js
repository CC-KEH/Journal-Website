//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');

//Connecting to mongodb using mongoose
const promise = mongoose.connect("mongodb://localhost:27017/posts");

promise.then(() => {
  console.log("Connected to Mongo Successfully!");
}).catch((error) => {
  console.log(error);
});

//* Format of the database
const postSchema = mongoose.Schema({
    title: String,
    post: String
});

//* Creating the Collection that follows Schema ie postSchema
const Post = mongoose.model('Post',postSchema);



const homestarter = "Lorem ipsum, dolor sit amet consectetur adipisicing asjkdaskljdh Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed labore nihil non voluptatibus adipisci quam molestiae ex explicabo natus nam illum enim, odit, ratione debitis culpa, cupiditate obcaecati corrupti architecto aliquid. Mollitia debitis itaque aliquam, nam quidem minus blanditiis nesciunt quasi voluptas, vel perspiciatis praesentium facilis expedita ad, voluptatum atque?";
let posts = [];

const app = express()
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/',(req,res)=>{
    res.render('home',{
        starter: homestarter,
        posts: posts
    });
});

app.get('/write',(req,res)=>{
    res.render('compose');
});

app.post('/write',(req,res)=>{
    const post = {
        title: req.body.highlight,
        content: req.body.textArea    
    }
    posts.push(post);
    res.redirect('/');
});

app.get('/posts/:postName',(req,res)=>{
    const requestedTitle =_.lowerCase(req.params.postName);
    
    posts.forEach(element=>{
        const storedElement = _.lowerCase(element.title);
        if(storedElement === requestedTitle ){
            res.render('post',{post:element});
        }
});
    
})

app.listen(4000,()=>{console.log('Listening on port 4000')});