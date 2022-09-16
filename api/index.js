require("dotenv").config();
//IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 4000;

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DATABASE
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.error(err);
  });

//MONGOOSE SCHEMA
const MemeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, max: 30 },
    url: String,
    tags: [String],
    likes: Number,
    downloads: Number,
  },
  { timestamp: true }
);

//MONGOOSE MODEL
const photoMeme = mongoose.model("photoMeme", MemeSchema);
const videoMeme = mongoose.model("videoMeme", MemeSchema);

app.get("/", (req, res) => {
  res.send("Welcome to Server of All India Meme");
});

app.get("/photo", (req, res) => {
  const { q } = req.query;
  photoMeme
    .find({})
    .then((photo) =>
      res.json(
        photo.filter(
          (get) =>
            get.title.toString().toLowerCase().startsWith(q) ||
            get.tags.toString().toLowerCase().includes(q)
        )
      )
    )
    .catch((err) => console.log(err));
});

app.get("/video", (req, res) => {
  const { q } = req.query;
  videoMeme
    .find({})
    .then((video) =>
      res.json(
        video.filter(
          (get) =>
            get.title.toString().toLowerCase().startsWith(q) ||
            get.tags.toString().toLowerCase().includes(q)
        )
      )
    )
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log("Server started at port 4000");
});
