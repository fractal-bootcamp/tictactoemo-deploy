import express from "express"
import ViteExpress from "vite-express";

const App = express();

App.get("/message", (req, res) => {
  res.status(200).send("Hello World")
})

ViteExpress.listen(App, 3000, () => console.log("server is listening"))