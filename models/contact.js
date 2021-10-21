const fs = require('fs');
const path = require('path');


const pathToFile = path.join(path.dirname(require.main.filename), 'data', 'contacts.json');

module.exports = class Contact {
    constructor(name,phone){
        this.name = name;
        this.phone = phone;
    }
    saveContact(){
        fs.readFile(pathToFile, (error, fileContent) =>{
            let contacts = [];

            if(!error){
                contacts = JSON.parse(fileContent);
            } else {
                console.log(error);
            }

            contacts.push(this);

            fs.writeFile(pathToFile, JSON.stringify(contacts), (error) => {
                if(error){console.log('Error', error);}
            });

        });
    }

    static fetchContacts(callBack){
        fs.readFile(pathToFile, (error, fileContent)=>{
            if(error){
                callBack([]);
            };

            callBack(JSON.parse(fileContent));
        });
    }
    static deleteItem(name,phone){
        fs.readFile(pathToFile, (error, fileContent)=>{
            let contacts = [];
            if(!error){
                contacts = JSON.parse(fileContent);
            }
           
            for(let i = 0; i < contacts.length; i++){
                if(contacts[i].name === name && contacts[i].phone === phone){
                    contacts.splice(i,1);
                    break;
                }
            }
            fs.writeFile(pathToFile, JSON.stringify(contacts), (error) => {
                if(error){console.log(error);}
            });

        });
    };
}