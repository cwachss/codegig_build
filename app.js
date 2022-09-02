const express = require("express");
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const bodyParser = require("body-parser");
const path = require("path");
// below is a workaround the security features in handlebars. do not use if users can write templates that you will run on your server.
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

// Database
const db = require("./config/database");

// Test db
db.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error: " + err));

const app = express();

// HandleBars
app.engine(
  "handlebars",
  exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// Index route
app.get("/", (req, res) => res.render("index", { layout: "landing" }));

app.use("/gigs", require("./routes/gigs"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`server started on port ${PORT}`));
