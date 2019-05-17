const express=require('express')

const app=express()

app.engine('html',require('express-art-template'))

app.set('view options',{
    debug:process.env.NODE_ENV!=='production'
})

const port=3000

app.listen(port,()=>console.log('Server is ready'))

app.get('/',(req,resp)=>resp.render('index.html',
{
    title:"Facebook API Node版"
}))