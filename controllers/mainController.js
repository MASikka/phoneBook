
const Contact = require('../models/contact');



exports.getMainPage = (req, res) => {
    Contact.fetchContacts(items => {
        res.render('index.ejs', {myContacts: items});
    });
    
    
};

exports.postNewContact = (req, res) => {
    const newContact = new Contact(req.body.newName,req.body.newNumber);
    newContact.saveContact();

    res.redirect('/');
};

exports.deleteContact =  (req, res) => {
    let itemToDeleteName = req.body.checkbox;
    let itemToDeletePhone = req.body.hidden;
    Contact.deleteItem(itemToDeleteName,itemToDeletePhone);
    res.redirect('/');

};