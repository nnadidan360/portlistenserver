const express = require("express")
const http = require("http");
const nodemailer = require("nodemailer")
const cors = require("cors")

const app = express()
const server = http.createServer(app);
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors("*"))

app.get("/", (req, res) => {
  res.send("hello node server");
});

app.post("/messageDetails", (req, res) => {
  const { message, name, email, subject } = req.body;
    console.log(req.body)
  console.log(
    `the details are name: ${name}, subject: ${subject}, email: ${email}, message: ${message}`
  );

    res.status(200).json("message Received successfully")
});

app.post("/sendToMail", (req, res) => {
    const {name, email, subject, message} = req.body

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.user,
            pass: process.env.pass
        },
        secure: false,
        tls:{
            rejectUnauthorized: false
        }
    })

    const mailoptions = {
        from: email,
        to: email,
        subject: subject,
        html: `<div class="container" style={{backgroundColor: #5f5b445b, height: 100vh, display: flex, justifyContent: center, align-items: center}}>
        <div>
            <h3> my name is ${name} </h3> and this is the message i have for you
            <h4>
                ${message}
            </h4>
            </div>
        </div>`
    }

    transporter.sendMail(mailoptions, (err, info) => {
        if(err){
            console.log(err)

        }
        else{
            console.log(info)
            res.status(200).send(info)

        }
    })

    res.status(200).json("Your message was successfully sent to Nnadi Daniel")

})

server.listen(port, () => {
  console.log(`server started on ${port}`);
});
