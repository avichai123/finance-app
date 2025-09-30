const express = require('express');
const app = express();
const PORT = 3000; 
const dotenv = require('dotenv');
dotenv.config();
const { sequelize } = require('./utils/database');

app.use(express.json());

app.get('/' ,(req, res) => {
   res.json('hello world!'); 
});

(async () => {
    try{
        await sequelize.authenticate();
        console.log('Database connected successfully!');
        app.listen(PORT , () => {
            console.log('server started!');
        });
    }catch(e){
        console.error('Unable to connect to the database :' , e);
        
    }
})();
