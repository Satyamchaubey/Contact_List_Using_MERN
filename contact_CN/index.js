const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));



var contactList = [];

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Let us play with ejs"
    });
});

// <--R--> Read Data from Database and Browser
app.get('/', function(req, res){
    Contact.find({},(err,contacts)=>{
        if(err){
            console.log("error")
            return;
        }
        return res.render('home',{
            title: "Contact List",
            contact_list: contacts
       
        });
    });

    });

    // <--C--> Add data from Database and Browser
app.post('/create-contact', function(req, res){
    // contactList.push(req.body);
    // return res.redirect('back');

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){console.log('Error in creating a contact!')
            return;}
            console.log('******', newContact);
            return res.redirect('back');
    })
  

});

// <--D--> Delete contact from database and browser
app.get('/delete-contact/', function(req, res){
    let id = req.query.id

    Contact.findByIdAndDelete(id,(err)=>{
        if(err){
            console.log("there is some error for deleting data")
        }
        return res.redirect('back');
    })

});






app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})

