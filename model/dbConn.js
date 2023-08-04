const mongoose = require("mongoose");
const db = process.env.MONGODB_URI;
mongoose.connect(db).then(()=>{
    console.log(`connected to db`);
}).catch((err)=>{
    console.log(`no connection`,err);
})