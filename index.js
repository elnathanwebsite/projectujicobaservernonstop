const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const filePath = 'data.json';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Fungsi untuk membaca data dari file JSON
const readData = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

// Fungsi untuk menulis data ke file JSON
const writeData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Endpoint untuk mendapatkan data
app.get('/data', (req, res) => {
    res.json(readData());
});

// Endpoint untuk menambahkan data dari form
app.post('/data', (req, res) => {
    const { nama, umur, alamat } = req.body;
    
    if (!nama || !umur || !alamat) {
        return res.status(400).json({ message: 'Harap lengkapi semua data!' });
    }
    
    const data = readData();
    const newData = { nama, umur: parseInt(umur), alamat };
    data.push(newData);
    writeData(data);
    
    res.json({ message: 'Data berhasil disimpan!', data: newData });
});

// **Hapus app.listen() dan tambahkan ini**
module.exports = app;
