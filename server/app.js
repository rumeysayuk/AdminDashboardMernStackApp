const express = require("express")
const dotenv = require("dotenv")
const databaseConnectionHelper = require("./helpers/database/databaseConnectionHelper")
const cors = require("cors")
const path = require("path");
const bodyParser = require("body-parser")
const app = express();

dotenv.config()
app.use(express.static(path.join(__dirname, "public")))
app.use(cors());
// corsOptionsDelegate
const PORT = process.env.PORT || 5000
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.get("/", (req, res) => {
   res.send(`Server up and running`)
})

databaseConnectionHelper()
   .then(() => app.listen(PORT, () => console.log(`Server Running on Port : ${PORT}`)))
   .catch(err => console.log(err));