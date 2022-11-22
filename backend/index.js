const express = require("express");
const mysql = require("mysql2"); //-->Use mysql2 always, else may get some errors

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Saisahana@25",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("Hello Welcome to Backend");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});

app.post("/addbook", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)"; //-->We will add the value using array syntax sort of, so here for now we use (?)
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [values], (err, data) => {
    //-->Here its an array of array of strings
    //We are adding the values of the various fields of the schema here,using this syntax
    if (err) {
      return res.json(err);
    }
    return res.json("Book Created Successfully");
  });
});

app.delete("/delete/:id", (req, res) => {
  const q = "DELETE FROM books WHERE id = ?"; //-->We will give in array the value of the id of the book which need to be deleted from frontend, in array
  const value = [req.params.id]; //-->Need to be in array
  db.query(q, value, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json({ message: "Book Deleted Successfully" });
  });
});

app.put("/update/:id", (req, res) => {
  const q =
    "UPDATE books SET `title`=?, `desc`=?, `price`=?, `cover`=? WHERE id = ? ";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [...values, req.params.id], (err, data) => {
    //-->While updating just an array of all the input values and the id of the book to be updated
    if (err) {
      return res.json(err);
    }
    return res.json("Book Updated Successfully");
  });
});
app.listen(8000, () => {
  console.log("Connected To Backend of BookStore");
});
