const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3500;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  let response = {
    title: "Next-Gen CMS",
    text: [
      { attr: "para1", content: "THis is the first paragraph" },
      { attr: "para2", content: "thIS is the second paragraph" },
    ],
    attributes: [
      { attr: "title", value: "This element has a dynamic title" },
      { attr: "href", value: "This is a dynamic link" },
    ],
  };
  res.status(200).json(response);
});

app.listen(PORT, () => {
  console.log(`Server Started on Port: ${PORT}`);
});
