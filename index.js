const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3500;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  let response = {
    title: "Next-Gen CMS",
    content: [
      { attr: "para1", content: "THis is the first paragraph" },
      { attr: "para2", content: "thIS is the second paragraph" },
    ],
  };
  res.status(200).json(response);
});

app.listen(PORT, () => {
  console.log(`Server Started on Port: ${PORT}`);
});
