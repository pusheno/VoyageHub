const express = require("express");
const cors = require("cors");
const multer = require("multer");

const path = require("./routes/path.js");
const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Headers", "Content-Type");
  res.append("Access-Control-Allow-Headers", "x-auth-token");
  next();
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.array("files", 5), (req, res) => {
  console.log(req.body);
  console.log(req.files);
  res.json({ message: "Pliki zostały pomyślnie przesłane" });
});

app.use("/path", path);

app.all("*", function (req, res, next) {
  console.log("Błąd: Nie znaleziono.");
  res.statusCode = 404;
  return res.send("Nie znaleziono.");
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).send({
    message: err.message,
    error: err,
  });
});

app.listen(8000, () => {
  console.log(`Serwer działa na porcie 8000.`);
});
