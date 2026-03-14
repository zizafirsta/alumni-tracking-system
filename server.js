const express = require("express")

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static("public"))

let alumni = []

app.get("/alumni",(req,res)=>{
    res.json(alumni)
})

app.post("/alumni",(req,res)=>{
    alumni.push(req.body)
    res.json({message:"Alumni ditambahkan"})
})

app.post("/track/:id",(req,res)=>{

    const id=req.params.id

    const sources=[
        "LinkedIn",
        "Google Scholar",
        "GitHub",
        "ResearchGate"
    ]

    const randomSource=sources[Math.floor(Math.random()*sources.length)]

    const score=Math.floor(Math.random()*100)

    let status=""

    if(score>=70){
        status="Identified"
    }
    else if(score>=40){
        status="Need Verification"
    }
    else{
        status="Not Relevant"
    }

    alumni[id].status=status
    alumni[id].confidence=score
    alumni[id].source=randomSource

    res.json(alumni[id])

})

app.listen(PORT,()=>{
    console.log("Server running")
})