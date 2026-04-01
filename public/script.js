const supabase = window.supabase.createClient(
  "https://nimkxzrlfnhpbkszleet.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pbWt4enJsZm5ocGJrc3psZWV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwMjU4ODIsImV4cCI6MjA5MDYwMTg4Mn0.NEYeykhAIgeuzKXBwVvmMJ1LVq16Qg-PsFb-m759lSc"
)

let alumniData = []
let chartInstance = null


// =========================
// LOAD DATA (GET)
// =========================
async function loadData() {

    const { data, error } = await supabase
        .from("alumni")
        .select("*")
        .order("id", { ascending: true })

    if (error) {
        console.error(error)
        alert("Gagal mengambil data")
        return
    }

    alumniData = data

    renderTable(data)
    updateDashboard(data)
    renderChart(data)
}


// =========================
// RENDER TABLE
// =========================
function renderTable(data) {

    const list = document.getElementById("list")
    list.innerHTML = ""

    data.forEach((a) => {

        let badge = ""

        if (a.status === "Identified") {
            badge = `<span class="badge bg-success">Identified</span>`
        }
        else if (a.status === "Need Verification") {
            badge = `<span class="badge bg-warning text-dark">Need Verification</span>`
        }
        else if (a.status === "Not Relevant") {
            badge = `<span class="badge bg-danger">Not Relevant</span>`
        }
        else {
            badge = `<span class="badge bg-secondary">Not Tracked</span>`
        }

        list.innerHTML += `
        <tr onclick="showDetail(${a.id})" style="cursor:pointer">
            <td>${a.name}</td>
            <td>${a.prodi}</td>
            <td>${a.tahun}</td>

            <td>${badge}</td>
            <td>${a.confidence ?? "-"}</td>
            <td>${a.source || "-"}</td>

            <td>
                <button class="btn btn-sm btn-primary" onclick="event.stopPropagation(); track(${a.id})">Track</button>
                <button class="btn btn-sm btn-danger" onclick="event.stopPropagation(); hapus(${a.id})">Delete</button>
            </td>
        </tr>
        `
    })
}


// =========================
// INSERT DATA
// =========================
async function tambah() {

    const name = document.getElementById("name").value
    const prodi = document.getElementById("prodi").value
    const tahun = document.getElementById("tahun").value

    if (!name || !prodi || !tahun) {
        alert("Semua field harus diisi")
        return
    }

    const { error } = await supabase
        .from("alumni")
        .insert([
            {
                name,
                prodi,
                tahun,
                status: "Not Tracked"
            }
        ])

    if (error) {
        console.error(error)
        alert("Gagal menambahkan data")
        return
    }

    document.getElementById("name").value = ""
    document.getElementById("prodi").value = ""
    document.getElementById("tahun").value = ""

    loadData()
}


// =========================
// LOADING
// =========================
function showLoading() {
    document.getElementById("loading").style.display = "flex"
}

function hideLoading() {
    document.getElementById("loading").style.display = "none"
}


// =========================
// TRACK (UPDATE)
// =========================
async function track(id) {

    showLoading()

    const sources = ["LinkedIn", "Google Scholar", "GitHub", "ResearchGate"]
    const randomSource = sources[Math.floor(Math.random() * sources.length)]
    const score = Math.floor(Math.random() * 100)

    let status = ""

    if (score >= 70) status = "Identified"
    else if (score >= 40) status = "Need Verification"
    else status = "Not Relevant"

    const { error } = await supabase
        .from("alumni")
        .update({
            status,
            confidence: score,
            source: randomSource
        })
        .eq("id", id)

    hideLoading()

    if (error) {
        console.error(error)
        alert("Tracking gagal")
        return
    }

    loadData()
}


// =========================
// DELETE
// =========================
async function hapus(id) {

    if (!confirm("Yakin ingin menghapus data alumni ini?")) return

    const { error } = await supabase
        .from("alumni")
        .delete()
        .eq("id", id)

    if (error) {
        console.error(error)
        alert("Gagal menghapus data")
        return
    }

    loadData()
}


// =========================
// SEARCH
// =========================
function searchAlumni() {

    const keyword = document.getElementById("search").value.toLowerCase()

    const filtered = alumniData.filter(a =>
        a.name.toLowerCase().includes(keyword)
    )

    renderTable(filtered)
}


// =========================
// FILTER STATUS
// =========================
function filterStatus(status) {

    if (!status) {
        renderTable(alumniData)
        return
    }

    const filtered = alumniData.filter(a => a.status === status)
    renderTable(filtered)
}


// =========================
// DETAIL
// =========================
function showDetail(id) {

    const a = alumniData.find(x => x.id == id)

    alert(
        "Nama: " + a.name + "\n" +
        "Prodi: " + a.prodi + "\n" +
        "Tahun: " + a.tahun + "\n" +
        "Status: " + a.status + "\n" +
        "Confidence: " + (a.confidence || "-") + "\n" +
        "Source: " + (a.source || "-")
    )
}


// =========================
// EXPORT CSV
// =========================
function exportCSV() {

    let csv = "Nama,Prodi,Tahun,Status,Confidence,Source\n"

    alumniData.forEach(a => {
        csv += `${a.name},${a.prodi},${a.tahun},${a.status},${a.confidence || ""},${a.source || ""}\n`
    })

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "alumni_data.csv"
    link.click()
}


// =========================
// DASHBOARD
// =========================
function updateDashboard(data) {

    let identified = 0
    let verify = 0
    let not = 0

    data.forEach(a => {

        if (a.status === "Identified") identified++
        if (a.status === "Need Verification") verify++
        if (a.status === "Not Relevant") not++

    })

    document.getElementById("total").innerText = data.length
    document.getElementById("identified").innerText = identified
    document.getElementById("verify").innerText = verify
    document.getElementById("not").innerText = not
}


// =========================
// CHART
// =========================
function renderChart(data) {

    let identified = 0
    let verify = 0
    let not = 0

    data.forEach(a => {

        if (a.status === "Identified") identified++
        if (a.status === "Need Verification") verify++
        if (a.status === "Not Relevant") not++

    })

    const ctx = document.getElementById("alumniChart")

    if (!ctx) return

    if (chartInstance) {
        chartInstance.destroy()
    }

    chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Identified", "Need Verification", "Not Relevant"],
            datasets: [{
                label: "Jumlah Alumni",
                data: [identified, verify, not],
                backgroundColor: [
                    "#8B0000",
                    "#B22222",
                    "#FF4D4D"
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    })
}


loadData()