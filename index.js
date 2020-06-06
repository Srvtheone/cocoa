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
      { id: "para1", content: "THis is the first paragraph" },
      { id: "para2", content: "thIS is the second paragraph" },
      { id: "para3", content: "Road to dynamism" },
      { id: "multi", content: "Testing If Multiple Attributes Work?" },
      { id: "imgtxt1", content: "The image above is dynamic too!" },
    ],
    attributes: [
      {
        id: "attr1",
        attribute: "title",
        value: "This element has a dynamic title",
      },
      { id: "attr2", attribute: "href", value: "/dynamic" },
      { id: "multi-attr1", attribute: "style", value: "color: red;" },
      { id: "attr5", attribute: "target", value: "_blank" },
      { id: "attr6", attribute: "style", value: "font-size: 44px;" },
    ],
    images: [
      {
        id: "img1",
        src: "https://via.placeholder.com/150x150.png",
        alt: "Dynamic Image",
      },
    ],
  };
  res.status(200).json(response);
});

app.listen(PORT, () => {
  console.log(`Server Started on Port: ${PORT}`);
});
