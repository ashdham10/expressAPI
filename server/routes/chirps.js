const express = require('express');
const chirpStore = require('../chirpstore');
let router = express.Router();

router.get("/:id?", function (req, res) {
    let id = req.params.id;
    if(id){
        res.json(chirpStore.GetChirp(id));
    } else {
        res.send(chirpStore.GetChirps());
    }
});


router.post("/", function (req, res) {
    let chirp = req.body;
    chirpStore.CreateChirp(chirp);
    res.send('chirp chirp!');
});


router.put("/:id", function (req, res) {
    let id = req.params.id;
    let editedChirp = req.body;
    chirpStore.UpdateChirp(id, editedChirp);
    res.send('Chirp updated!');
});


router.delete("/:id", function (req, res) {
    chirpStore.DeleteChirp(id);
    res.send('Deleted!');
});


module.exports = router;