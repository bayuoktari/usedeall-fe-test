require("dotenv").config()
const express = require("express")
const path = require("path")
const cors = require("cors")
const errorHandler = require("./errorHandler")

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `http://localhost:${process.env.PORT}` })) // create-react-app dev server
}

app.use("/call", require("./routes/call"))

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"))
  })
}

app.use(errorHandler)

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on localhost:${process.env.SERVER_PORT}`)
})
