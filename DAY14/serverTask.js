// Importing express
const express = require('express');

// Creating a server
const server = express();

// Assign a port number
const port = 5007;

// Items for different categories
const clothing = [
    { id: 1, name: 'jeans' },
    { id: 2, name: 'shirts' },
    { id: 3, name: 'Tshirts' }
];
const electronics = [
    { id: 1, name: 'laptop' },
    { id: 2, name: 'mobile' },
    { id: 3, name: 'headphones' }
];
const groceries = [
    { id: 1, name: 'apples' },
    { id: 2, name: 'milk' },
    { id: 3, name: 'bread' }
];

// Middleware
server.use(express.json());

// Base route
server.get('/', (req, res) => {
    res.end("Server is running");
});

// Get all clothing items
server.get('/product/clothing', (req, res) => {
    res.json(clothing);
});

// Add a new clothing item
server.post('/product/clothing', (req, res) => {
    const newItem = { id: clothing.length + 1, name: req.body.name };
    clothing.push(newItem);
    res.status(201).json(newItem);
});

// Update a clothing item
server.put('/product/clothing/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = clothing.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
        clothing[itemIndex].name = req.body.name;
        res.json(clothing[itemIndex]);
    } else {
        res.status(404).json("Item not found in the clothing category");
    }
});

// Get all electronic items
server.get('/product/electronics', (req, res) => {
    res.json(electronics);
});

// Add a new electronic item
server.post('/product/electronics', (req, res) => {
    const newItem = { id: electronics.length + 1, name: req.body.name };
    electronics.push(newItem);
    res.status(201).json(newItem);
});

// Update an electronic item
server.put('/product/electronics/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = electronics.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
        electronics[itemIndex].name = req.body.name;
        res.json(electronics[itemIndex]);
    } else {
        res.status(404).json("Item not found in the electronics category");
    }
});

// Get all grocery items
server.get('/product/groceries', (req, res) => {
    res.json(groceries);
});

// Add a new grocery item
server.post('/product/groceries', (req, res) => {
    const newItem = { id: groceries.length + 1, name: req.body.name };
    groceries.push(newItem);
    res.status(201).json(newItem);
});

// Update a grocery item
server.put('/product/groceries/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = groceries.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
        groceries[itemIndex].name = req.body.name;
        res.json(groceries[itemIndex]);
    } else {
        res.status(404).json("Item not found in the groceries category");
    }
});

// Start the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
