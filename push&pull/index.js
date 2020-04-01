const express = require('express');
// Headers
const cors= require ('cors'); 
const app = express();
app.use(express.json());
app.use(cors());
const messages = [];
app.post('/messages',(req,res)=>{
    const {body}=req;
    console.log('new message',body.content , body.name)

    messages.push(body);
    res.status(204).end()

})
app.get('/messages',(req,res)=>{
res.json(messages)
});
const responses={};

app.post('/subscribe',(req,res)=>{
    const {id}= req.body;
    console.log('new subscribers',id)
    responses[id ]= res;

})
app.post('/messagesSubscriber',(req,res)=>{
    const { body } = req;
    Object.keys(responses).forEach((subId)=>{
        responses[subId].json(body)
        delete responses[subId]
    });
    res.status(204).end();
})
app.listen(3000,()=>{
    console.info('server listening on port 3000')
})
