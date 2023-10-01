const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = process.env.PORT || 3000;
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const path = require("path");
const viewDir = path.join(__dirname, "./views");

app.use(express.static(viewDir));

app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    defaultLayout: false,
    layoutsDir: "views",
  })
);

app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("Chatpage");
});

io.on("connection", (socket) => {
  socket.emit("message", "Welcome User");
});

app.listen(port, () => {
  console.log("you are connected to this port");
});
