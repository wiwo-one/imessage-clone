import express from 'express';
import mongoose from 'mongoose';
import pusher from 'pusher';
import cors from 'cors';
import Conversation from './mongoData.js'

//app init
const app = express();
const port = process.env.PORT || 9000;


//middlewares
app.use(cors());
app.use(express.json());


//db config
const user = 'dbUser';
const pass = 'QC9LP2nijqFFKcz';
const mongoURI = `mongodb+srv://${user}:${pass}@cluster0.1mwu2.mongodb.net/iMessageDB?retryWrites=true&w=majority`;

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

mongoose.connection.once('open', ()=> {
    console.log("DB CONNECTED");
})

//api routes
app.get('/',(req,res)=> {
    res.status(200).send("Hello Super Programmer");
    console.log(`Zapytanie z ${req}`);
})


//najlepiej testować Postmanem - mozna dac tylko fragment modelu
app.post('/new/conversation', (req, res) => {
    const dbData = req.body;

    Conversation.create(dbData, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.post('/new/message', (req, res)=> {
    Conversation.update(
        {_id: req.query.id},
        {$push: {conversation: req.body}},
        (err, data) => {
            if(err) {
                console.log(`ERROR! ${err}`)
                res.status(500).send(err)
            } else {
                console.log("Updated")
                res.status(201).send(data)
            }
        }
    )
})


//lista konwersacji
app.get('/get/conversationList', (req,res) => {
    Conversation.find((err,data)=> {
        if (err) {
            console.log(`ERROR: ${err}`)
            res.status(500).send(err)
        } else {

            const conversations = []

            data.map(conv => {
                const conversationInfo = {
                    id: conv._id,
                    name: conv.chatName,
                    timestamp: conv.conversation[0].timestamp
                }

                conversations.push(conversationInfo);
            })

            res.status(200).send(conversations);
        }
    })
})

//jedna rozmowa
app.get('/get/conversation', (req,res)=> {
    const id = req.query.id;
    Conversation.find(
        {_id: id},
        (err, data) => {
            if (err) {
                console.log(`ERROR: ${err}`)
                res.status(500).send(err)
            } else {
                res.status(200).send(data)
            }
        }
    )
})



//ostatnia wiadomość
app.get('/get/lastMessage', (req,res)=> {
    const id = req.query.id;
    Conversation.find(
        {_id: id},
        (err, data) => {
            if (err) {
                console.log(`ERROR: ${err}`)
                res.status(500).send(err)
            } else {
                res.status(200).send(data[0].conversation[data[0].conversation.length-1])
                console.log(data[0].conversation.length)
            }
        }
    )
})


//app listen
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })