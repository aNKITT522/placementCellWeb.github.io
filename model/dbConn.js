const mongoose = require("mongoose");
const db = process.env.DATABASE;
mongoose.connect(db).then(()=>{
    console.log(`connected to db`);
}).catch((err)=>{
    console.log(`no connection`);
})