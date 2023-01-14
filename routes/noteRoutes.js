const express = require('express')
const noteRouter = express.Router()
const { NoteModel } = require('../models/notesmodel')

noteRouter.get("/", async (req, res) => {
    try {
        const notes = await NoteModel.find()
        res.send(notes)
    } catch (error) {
        res.send("unable to fetch notes")
    }

})

noteRouter.post("/create", async (req, res) => {
    const payload = req.body
    try {
        const note = new NoteModel(payload)
        await note.save()
        res.send("note added")
    } catch (error) {
        res.send({ "msg": "error in adding", error })
    }
})

noteRouter.patch("/update/:id", async (req, res) => {
    const ID = req.params.id
    const payload = req.body
    try {
        await NoteModel.findByIdAndUpdate({ "_id": ID }, payload)
        res.send("note updated")
    } catch (error) {
        res.send("error in updating", error)
    }
})

noteRouter.delete("/delete/:id", async (req, res) => {
    const ID = req.params.id
    try {
        await NoteModel.findByIdAndDelete({ "_id": ID })
        res.send("note deleted")
    } catch (error) {
        res.send("error in deleting", error)
    }
})

module.exports = { noteRouter }