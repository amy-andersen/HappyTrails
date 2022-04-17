const mongoose = require('mongoose');

//connect and set up new db. Add options to handle deprecation warnings
mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>{
        console.log('You are connected to the database')
    })
    .catch((err)=>{
        console.log('You had a problem connecting to the database. The error:', err)
    })