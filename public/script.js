let alumniData = []
let chartInstance = null

async function loadData(){

    const res = await fetch("/alumni")
    const data = await res.json()

    alumniData = data

    renderTable(data)
    updateDashboard(data)
    renderChart(data)

}

function renderTable(data){

    const list = document.getElementById("list")
    list.innerHTML = ""

    data.forEach((a,index)=>{

        list.innerHTML += `

        <tr>

        <td>${a.name}</td>
        <td>${a.prodi}</td>
        <td>${a.tahun}</td>

        <td>${a.status || "-"}</td>
        <td>${a.confidence || "-"}</td>
        <td>${a.source || "-"}</td>

        <td>
        <button class="btn btn-sm btn-primary" onclick="track(${index})">Track</button>
        <button class="btn btn-sm btn-danger" onclick="hapus(${index})">Delete</button>
        </td>

        </tr>

        `
    })

}

async function tambah(){

    const name = document.getElementById("name").value
    const prodi = document.getElementById("prodi").value
    const tahun = document.getElementById("tahun").value

    if(!name || !prodi || !tahun){
        alert("Semua field harus diisi")
        return
    }

    await fetch("/alumni",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            name,
            prodi,
            tahun,
            status:"Not Tracked"

        })

    })

    document.getElementById("name").value=""
    document.getElementById("prodi").value=""
    document.getElementById("tahun").value=""

    loadData()

}

async function track(id){

    alert("System sedang mencari data alumni...")

    await fetch("/track/"+id,{
        method:"POST"
    })

    loadData()

}

function hapus(index){

    if(!confirm("Yakin ingin menghapus data alumni ini?")) return

    alumniData.splice(index,1)

    renderTable(alumniData)
    updateDashboard(alumniData)
    renderChart(alumniData)

}

function searchAlumni(){

    const keyword = document.getElementById("search").value.toLowerCase()

    const filtered = alumniData.filter(a =>

        a.name.toLowerCase().includes(keyword)

    )

    renderTable(filtered)

}

function updateDashboard(data){

    let identified = 0
    let verify = 0
    let not = 0

    data.forEach(a=>{

        if(a.status === "Identified") identified++
        if(a.status === "Need Verification") verify++
        if(a.status === "Not Relevant") not++

    })

    document.getElementById("total").innerText = data.length
    document.getElementById("identified").innerText = identified
    document.getElementById("verify").innerText = verify
    document.getElementById("not").innerText = not

}

function renderChart(data){

    let identified = 0
    let verify = 0
    let not = 0

    data.forEach(a=>{

        if(a.status === "Identified") identified++
        if(a.status === "Need Verification") verify++
        if(a.status === "Not Relevant") not++

    })

    const ctx = document.getElementById("alumniChart")

    if(!ctx) return

    if(chartInstance){
        chartInstance.destroy()
    }

    chartInstance = new Chart(ctx,{

        type:"bar",

        data:{
            labels:["Identified","Need Verification","Not Relevant"],

            datasets:[{
                label:"Jumlah Alumni",
                data:[identified,verify,not],
                backgroundColor:[
                    "#8B0000",
                    "#B22222",
                    "#FF4D4D"
                ]
            }]

        },

        options:{
            responsive:true,
            plugins:{
                legend:{
                    display:false
                }
            }
        }

    })

}

loadData()