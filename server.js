import 'dotenv/config'
import express from 'express'
import { createClient } from '@supabase/supabase-js'

const app = express()
const PORT = process.env.PORT || 3000


// SUPABASE CONFIG
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)


// MIDDLEWARE
app.use(express.json())
app.use(express.static("public"))


// TEST DATABASE
app.get('/test-db', async (req, res) => {
  const { data, error } = await supabase
    .from('alumni')
    .select('*')

  if (error) return res.status(500).json({ error })

  res.json(data)
})


// GET ALL ALUMNI
app.get("/alumni", async (req, res) => {
  const { data, error } = await supabase
    .from('alumni')
    .select('*')
    .order('id', { ascending: true })

  if (error) return res.status(500).json({ error })

  res.json(data)
})


// ADD ALUMNI
app.post("/alumni", async (req, res) => {
  try {
    const { name, prodi, tahun } = req.body

    if (!name || !prodi || !tahun) {
      return res.status(400).json({ message: "Semua field wajib diisi" })
    }

    const { data, error } = await supabase
      .from('alumni')
      .insert([
        {
          name,
          prodi,
          tahun: parseInt(tahun),
          status: "Not Tracked"
        }
      ])
      .select()

    if (error) throw error

    res.json({
      message: "Alumni berhasil ditambahkan",
      data
    })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


// TRACK ALUMNI (SIMULASI)

app.post("/track/:id", async (req, res) => {

  const id = req.params.id

  // simulasi hasil pencarian (lebih realistis)
  const candidates = [
    {
      name: "Muhammad Rizky",
      role: "Software Engineer",
      company: "Google",
      location: "Jakarta"
    },
    {
      name: "M Rizky",
      role: "Backend Developer",
      company: "Startup",
      location: "Malang"
    }
  ]

  // pilih kandidat terbaik (simulasi scoring)
  const best = candidates[Math.floor(Math.random() * candidates.length)]

  const score = Math.floor(Math.random() * 100)

  let status = ""
  if (score >= 70) status = "Identified"
  else if (score >= 40) status = "Need Verification"
  else status = "Not Relevant"

  const { data, error } = await supabase
    .from('alumni')
    .update({
      status,
      confidence: score,
      source: best.company
    })
    .eq('id', id)
    .select()

  res.json({
    message: "Tracking selesai",
    kandidat: best,
    data
  })
})


// DELETE (BONUS FITUR)

app.delete("/alumni/:id", async (req, res) => {
  const id = req.params.id

  const { error } = await supabase
    .from('alumni')
    .delete()
    .eq('id', id)

  if (error) return res.status(500).json({ error })

  res.json({ message: "Alumni dihapus" })
})


// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})