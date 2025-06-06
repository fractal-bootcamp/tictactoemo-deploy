import express from "express"

const app = express()
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello from test-server!")
})

app.listen(PORT, () => {
    console.log(`Test server running at http://localhost:${PORT}`)
})
