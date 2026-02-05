import express from "express"
import cors from "cors"
import events from "events";

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 3000

const messageEventEmitter = new events.EventEmitter()


app.get("/message",(req,res)=>{
    messageEventEmitter.once("new message",(from,message)=>{
        res.json({from, message})
    })
})

app.post("/new-message",(req,res)=>{
    const {from, message} = req.body;
    messageEventEmitter.emit('new message',from,message)

    res.json({message:"success"})
})

app.listen(PORT, () => {
    console.log(`long-polling Server started on port ${PORT}`)
})