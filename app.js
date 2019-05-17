'use strict'

//加入需要的套件
const 
    express=require('express'),
    bodyParser=require('body-parser'),
    app=express().use(bodyParser.json())

//啟用服務監聽
app.listen(process.env.PORT || 3000,()=>console.log('faceHook is listenging.'))

//處理不同路由
app.post('/webhook',(req,resp)=>{

    //取得request物件
    let body=req.body

    //確定請求來自頁面訂閱
    if(body.object==='page'){
        //遍歷entry,若為batch可能會有多筆
        body.entry.forEach(function(entry){
            //取得訊息,為陣列
            //但只有一筆訊息,故取0
            let webhook_event=entry.messaging[0]
            console.log(webhook_event)
        })

        //返回200
        resp.status(200).send('EVENT_RECEIVED')
    }else{
        //若請求來源不正確,返回404
        resp.sendStatus(404)
    }
})

//實例-驗證來源
app.get('/webhook',(req,resp)=>{

    //驗證token,自訂亂數字串
    let VERIFY_TOKEN='ASDFG6772F12ff27GSS'

    //取得query參數
    let mode=req.query['hub.mode']
    let token=req.query['hub.verify_token']
    let challenge=req.query['hub.challenge']
    
    //檢查token與mode是否存在參數
    if(mode&&token){
        //檢查mode為subscribe與token正確
        if(mode==='subscribe'&&token===VERIFY_TOKEN){
            console.log('WEBHOOK_VERIFIED')
            //回傳challenge
            resp.status(200).send(challenge)
        }else{
            resp.sendStatus(403)
        }
    }
})