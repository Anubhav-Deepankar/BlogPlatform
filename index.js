const express = require("express");
const app = express();
const path = require("path");
const port = 8000;
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.redirect("/comments");
});

let comments = [
  { id: uuid(), user: "kartik", text: "Data centers set up by AWS also provide inbuilt features to help software developers." },

  { id: uuid(), user: "Arun", text: "AI helps in acclerating tasks which earlier required manual intervention." },
  {
    id: uuid(),
    user: "Naman",
    text: "Maybe the sensors were giving wrong reading to the control module which caused failure of the instrument.",
  },
];
//-----------------------------------------------------GET---REQUEST--------------------------------------------
// list all the comments

app.get("/comments", (req, res) => {

  const search = req.query.user;

  if (search) {
    const filteredComments = comments.filter((comment) =>
      comment.user.toLowerCase().includes(search.toLowerCase())
    );

    res.render("index", { comments: filteredComments });

  } else {
    res.render("index", { comments });
  }

});

// display a form to add a comment

app.get("/comments/new", (req, res) => {
  res.render("new");
});
//-------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------POST---REQUEST--------------------------------------------
// Create a new comment
app.post("/comments", (req, res) => {
  const { user, text } = req.body;

  comments.push({ id: uuid(), user, text });

  res.redirect("/comments");
});
//----------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------GET---REQUEST--------------------------------------------
// Show one comment
app.get("/comments/:commentid", (req, res) => {
  const { commentid } = req.params;

  const comment = comments.find((comment) => comment.id === commentid);

  res.render("show", { comment });
});

// get edit form for updating values
app.get("/comments/:commentid/edit", (req, res) => {
  const { commentid } = req.params;

  const comment = comments.find((comment) => comment.id === commentid);

  res.render("edit", { comment });
});
//--------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------PATCH---REQUEST--------------------------------------------
//update comment with the commentid
//isme sara data update nahi hota , patches me data update hota ha
app.patch("/comments/:commentid", (req, res) => {
  const { commentid } = req.params;
  const comment = comments.find((comment) => comment.id === commentid);
  

  console.log(req.body);

  comment.user = req.body.user;
  comment.text = req.body.text;

  res.redirect("/comments");
});
//----------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------DELETE---REQUEST--------------------------------------------
// delete a comment
app.delete("/comments/:commentid", (req, res) => {
  const { commentid } = req.params;

  comments = comments.filter((comment) => comment.id !== commentid);

  res.redirect("/comments");
});
//-------------------------------------------------------------------------------------------------------------------

const PORT = 8000;
app.listen(PORT, () => {
    console.log("Server running on", PORT);
});

