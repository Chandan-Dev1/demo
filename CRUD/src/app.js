const express = require("express")
const notesModel= require("./models/notes.model")
const app = express()
app.use(express.json())

app.post("/notes",async (req,res)=>{
    const {title,description}=req.body
    const notes = await notesModel.create({
        title,
        description
    })
    res.status(200).json({
        message:"notes is create successfully..",
        notes
    })
})

app.get("/notes",async (req,res)=>{
    
    const notes = await notesModel.find()
    res.status(201).json({
        message:"notes fatch successfully ",
        notes
    })
})

app.delete("/notes/:id", async(req,res)=>{
    const id= req.params.id

    const notes= await notesModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"notes delete successfully ",
        notes
    })
})

app.patch("/notes/:id", async (req, res) => {
    const id = req.params.id;
    const {description,title}=req.body

    const notes = await notesModel.findByIdAndUpdate(id,{description,title});

    res.status(200).json({
        message: "notes updated successfully",
        notes
    });
});

 module.exports=app