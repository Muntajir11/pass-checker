import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var authorised=false;
const customString = 'Wrong Password';

app.use(bodyParser.urlencoded({ extended: true }));

function checkPass(req,res,next)
{
  const pass=req.body["password"];
  if(pass==="ILoveProgramming"){
    authorised=true;
  }
  next();
}

app.use(checkPass);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });

app.post("/check", (req ,res) =>
{
    if(authorised)
    {
        res.sendFile(__dirname+"/public/secret.html");
    }
    else
    {
        res.sendFile(__dirname+"/public/error.html");
    }
});

app.listen(3000, ()=>{
    console.log(`Server running on port ${port}`);
});