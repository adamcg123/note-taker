const express = require("express");
const fs = require("fs");
const notes = require("./Develop/db/db.json");
const path = require("path");
const uuid = require("uuid");
const { DH_CHECK_P_NOT_SAFE_PRIME } = require("constants");

const app = express();
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/Develop/db/db.json"))
});

app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./Develop/db/db.json"))
    const newNote = req.body;
    newNote.id = uuid.v4();
    notes.push(newNote)
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(notes))
    res.json(notes)
})

app.delete("/api/notes/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./Develop/db/db.json"));
    const deleteNote = notes.filter((delNote) => delNote.id !== req.params.id);
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(deleteNote));
    res.json(deleteNote);

})

app.get("/", (req, res) => [
    res.sendFile(path.join(__dirname, "/Develop/public/index.html"))
])

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});


app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});