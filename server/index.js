const express=require('express');
const cors=require('cors');
const app=express();

app.use(express.json());
app.use(cors());
const port=5000;



let notes=[
    {
        id:1,
        title:"First Note",
        content:"This is the content of the first note" ,
        createdAt: new Date(),
    }
];

app.get('/',(req,res)=>{
    res.send("Server is running");
});
app.get('/api/notes',(req,res)=>{
    res.send(notes);
});
app.post('/api/notes',(req,res)=>{
    const {title,content}=req.body;
    if(!title || !content){
        return res.status(400).json({
            error:"Title and content is missing"
        });
    }
    const newNote={
        id:notes.length+1,
        title:title,
        content:content,
        createdAt:new Date().toISOString(),
    }
    notes.push(newNote);
    console.log(notes);
    res.status(201).json(newNote);
});

app.get('/api/notes/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const note=notes.find(note=>note.id===id);
    if(!note){
        res.status(404).json({
            error:"Note not found"
        });
    }
    res.status(200).json(note);
});
app.delete('/api/notes/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    let note=notes.find(note=> note.id===id);

    if(!note){
        res.status(404).json({
            error:"Notes not found"
        });

    }

    notes=notes.filter(note=> note.id!==id);
    console.log(notes);
    res.status(200).json({
        message:"notes deleted"
    });



});

app.put('/api/notes/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    let note=notes.find(note=>note.id===id);

    if(!note){
        return res.status(404).json({
            error:"Note not found"
        });
    }
    const {title,content}=req.body;

    if(!title || !content){
        res.status(404).json({
            error:"title and content is missing"
        });
    }

    note.title=title;
    note.content=content;

    res.status(200).json(notes);



});


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})