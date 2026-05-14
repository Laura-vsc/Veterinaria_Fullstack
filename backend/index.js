const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
// Configuración de la Base de Datos (XAMPP)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Admin123.',
    database: 'veterinaria'
});

// Probar conexión a MySQL
db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la BD:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// --- RUTAS DEL CRUD ---

// 1. Obtener todas las mascotas (GET)
app.get('/mascotas', (req, res) => {
    const sql = "SELECT * FROM mascotas";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json(data);
    });
});

// 2. Crear nueva mascota (POST)
app.post('/mascotas', (req, res) => {
    const sql = "INSERT INTO mascotas (nombreMascota, edad, raza, nombreDueno, telefonoDueno, correoDueno) VALUES (?)";
    
    const values = [
        req.body.nombreMascota,
        req.body.edad,
        req.body.raza,
        req.body.nombreDueno,
        req.body.telefonoDueno,
        req.body.correoDueno
    ];

    db.query(sql, [values], (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json({ message: "Mascota registrada con éxito", id: data.insertId });
    });
});

// 3. Eliminar mascota (DELETE)
app.delete('/mascotas/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM mascotas WHERE id = ?";
    
    db.query(sql, [id], (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json({ message: "Mascota eliminada correctamente" });
    });
});
// 4. Actualizar mascota (PUT)
app.put("/mascotas/:id", (req, res) => {
    const id = req.params.id;
    const q = "UPDATE mascotas SET `nombreMascota`=?, `edad`=?, `raza`=?, `nombreDueno`=?, `telefonoDueno`=?, `correoDueno`=? WHERE id = ?";
    
    const values = [
        req.body.nombreMascota,
        req.body.edad,
        req.body.raza,
        req.body.nombreDueno,
        req.body.telefonoDueno,
        req.body.correoDueno
    ];

    db.query(q, [...values, id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Registro actualizado con éxito.");
    });
});

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
});