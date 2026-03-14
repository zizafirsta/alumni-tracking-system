const express = require("express")
const fs = require("fs")
const path = require("path")

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.static("public"))

const filePath = path.join(__dirname, "data", "alumni.json")

function readData(){
    return JSON.parse(fs.readFileSync(filePath))
}

function saveData(data){
    fs.writeFileSync(filePath, JSON.stringify(data,null,2))
}

app.get("/alumni",(req,res)=>{
    res.json(readData())
})

app.post("/alumni",(req,res)=>{
    const data = readData()
    data.push(req.body)
    saveData(data)
    res.json({message:"Alumni ditambahkan"})
})

app.post("/track/:id",(req,res)=>{

    const data = readData()
    const id = req.params.id

    const alumni = data[id]

    const sources = [
        "LinkedIn",
        "Google Scholar",
        "GitHub",
        "ResearchGate"
    ]

    const randomSource = sources[Math.floor(Math.random()*sources.length)]

    const score = Math.floor(Math.random()*100)

    let status = ""

    if(score >= 70){
        status = "Identified"
    }
    else if(score >= 40){
        status = "Need Verification"
    }
    else{
        status = "Not Relevant"
    }

    alumni.status = status
    alumni.confidence = score
    alumni.source = randomSource

    data[id] = alumni

    saveData(data)

    res.json(alumni)

})

app.listen(PORT,()=>{
    console.log("Server running http://localhost:3000")
})