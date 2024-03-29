const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3500;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  let response = {
    title: "Next-Gen CMS",
    text: [
      { id: "para1", content: "THis is the first paragraph" },
      { id: "para2", content: "thIS is the second paragraph" },
      { id: "para3", content: "Road to dynamism" },
      { id: "multi", content: "Testing If Multiple Attributes Work?" },
      { id: "imgtxt1", content: "The image above is dynamic too!" },
      { id: "frm1", content: "Password:" },
      { id: "nested1", content: "Parent Element" },
      { id: "nested2", content: "Child Element" },
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
      { id: "attr6", attribute: "style", value: "font-size: 34px;" },
      { id: "ph1", attribute: "placeholder", value: "Enter Password" },
    ],
    images: [
      {
        id: "img1",
        src: "https://via.placeholder.com/150x150.png",
        alt: "Dynamic Image",
      },
    ],
    list: [
      {
        id: "list1",
        length: 6,
        items: [
          {
            id: 1,
          },
        ],
      },
    ],
  };
  res.status(200).json(response);
});

app.post("/contact", (req, res) => {
  console.log(req.body);
  setTimeout(() => {
    res.status(200).send("Form Submitted");
  }, 1000);
});

app.listen(PORT, () => {
  console.log(`Server Started on Port: ${PORT}`);
});
