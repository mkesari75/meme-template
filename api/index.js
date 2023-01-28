require("dotenv").config();
//IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { json } = require("body-parser");
const app = express();

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

app.post("/photoupdatedownload", (req, res) => {
  const id = req.body.id;
  try {
    photoMeme.updateOne({ id }, { $inc: { downloads: 1 } }, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.end();
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/photoupdatelikes", (req, res) => {
  const id = req.body.id;
  const like = req.body.likes;
  try {
    photoMeme.updateOne({ id }, { $inc: { likes: like } }, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.end();
      }
    });
  } catch (err) {
    console.log(err);
  }
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

//api fetching
app.get("/getmeme", async (req, res) => {
  await fetch("https://api.imgflip.com/get_memes")
    .then((response) => response.json())
    .then((meme) => res.json(meme.data));
});

//for share page
app.get("/getsharedphotomeme", (req, res) => {
  const newid = mongoose.Types.ObjectId(req.query.id.trim());
  photoMeme.find({ _id: newid }).then((meme) => res.json(meme));
  console.log(newid);
});

app.get("/getsharedvideomeme", (req, res) => {
  const newid = mongoose.Types.ObjectId(req.query.id.trim());
  videoMeme.find({ _id: newid }).then((meme) => res.json(meme));
  console.log(newid);
});

app.get("/test", (req, res) => {
  mongoose
    .Collection("photoMeme")
    .find({ _id: "63a0601f547767f9e4618f80" })
    .then((meme) => res.json(meme));
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Server started at port 4000");
});
