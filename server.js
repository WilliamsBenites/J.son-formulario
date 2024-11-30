const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());


let items = [
    { id: 1, name: 'Item 1', price: 10 },
    { id: 2, name: 'Item 2', price: 20 }
];
let currentId = 3; 


app.get('/items', (req, res) => {
    res.json(items);
});


app.post('/items', (req, res) => {
    const newItem = { id: currentId++, ...req.body };
    items.push(newItem);
    res.status(201).json(newItem);
});


app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const index = items.findIndex(item => item.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Item no encontrado' });
    }
    items[index] = { id: parseInt(id), ...req.body };
    res.json(items[index]);
});


app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    items = items.filter(item => item.id !== parseInt(id));
    res.status(204).end();
});


app.get('/', (req, res) => {
    res.send('Bienvenido al servidor!');
});


app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
