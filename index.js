/* eslint-disable semi */
/* eslint-disable no-unused-vars */
const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors())
app.use(express.json());


var notas = [
	{
		"id": 3,
		"content": "Prueba 1 ",
		"date": "2019-05",
		"important": true
	},
	{
		"id": 4,
		"content": "Prueba 2 ",
		"date": "2019-05",
		"important": true
	},
	{
		"id": 5,
		"content": "Prueba 3",
		"date": "2019-05",
		"important": false
	}
];


app.get("/", (_request, response) =>{
	response.send("<h1> Holis </h1>");
});

app.get("/api/notes", (_request, response) =>{
	response.json(notas);
});

app.get("/api/notes/:id", (request, response) =>{
	const id = Number(request.params.id); 
	const note = notas.find(note => note.id ===id);
    
	if(note){
		response.send(note);
	} else{
		response.status(404).end();
	}
});


app.delete("/api/notes/:id", (request, response) =>{
	const id = Number(request.params.id); 
	notas = notas.filter( note => note.id !== id);
	response.status(204).end();
});

app.post("/api/notes", (request, response, next) =>{
	const note = request.body;

	if(!note || !note.content){
		return response.status(400).json({
			error: "note.content es missing"
		});
	}

	const ids = notas.map( note => note.id);
	const maxId = Math.max(...ids);
    
	const newNote = {
		id: maxId + 1,
		content: note.content,
		important: typeof note.important != "undefined" ? note.important : false,
		date : new Date().toISOString()
	};

	notas = [...notas, newNote];

	response.status(201).json(newNote);
});

app.use((request, response)=>{
	response.status(404).json({
		error: "Not found"
	})
})


const PORT = 3001;
app.listen(PORT, () =>{
	console.log(`Server running on port ${PORT}`);
});
