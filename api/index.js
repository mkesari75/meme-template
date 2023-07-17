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
    shares: Number,
  },
  { timestamp: true }
);

//MONGOOSE MODEL
const photoMeme = mongoose.model("photoMeme", MemeSchema);
const videoMeme = mongoose.model("videoMeme", MemeSchema);

//root
app.get("/", (req, res) => {
  res.send("Welcome to Server of All India Meme");
});

//for finding meme from db along with query
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

//for updating photo meme downloads counter
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

//for updating photo likes counter
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

//for updating photomeme shares counter in db
app.post("/photoupdateshares", (req, res) => {
  const id = req.body.id;
  console.log(id);
  try {
    photoMeme.updateOne({ _id: id }, { $inc: { shares: 1 } }, (err) => {
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

//for updating video downloads counter in db
app.post("/videoupdatedownload", (req, res) => {
  const id = req.body.id;
  try {
    videooMeme.updateOne({ _id: id }, { $inc: { downloads: 1 } }, (err) => {
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

//for updating video likes counter in db
app.post("/videooupdatelikes", (req, res) => {
  const id = req.body.id;
  const like = req.body.likes;
  try {
    videoMeme.updateOne({ id }, { $inc: { likes: like } }, (err) => {
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

//for updating shares counter in db
app.post("/videoupdateshares", (req, res) => {
  const id = req.body.id;
  console.log(id);
  try {
    videoMeme.updateOne({ _id: id }, { $inc: { shares: 1 } }, (err) => {
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

//for finding meme from db along with query
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

app.listen(process.env.PORT || 4000, () => {
  console.log("Server started at port 4000");
});
