require('dotenv').config();
const express =require('express')
const cloudinary =require('cloudinary');
const cors =require('cors');
const fileUpload = require('express-fileupload');
const rootRouter =require('./routes/index');
const app=express();
app.use(express.json());
app.use(cors());


app.use('/api/v1',rootRouter);

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API,
    api_secret:process.env.CLOUDINARY_SECRET
})

app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );

  app.listen(3000);
// app.listen(process.env.PORT | 3000, ()=>{
//     console.log(`Server is runnig on ${process.env.PORT}`)
// });