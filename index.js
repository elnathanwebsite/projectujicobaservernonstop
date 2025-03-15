const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Koneksi ke MongoDB Atlas
mongoose.connect('mongodb+srv://username:password@cluster.mongodb.net/database_name', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Buat model data
const DataSchema = new mongoose.Schema({
    nama: String,
    umur: Number,
    alamat: String
});
const Data = mongoose.model('Data', DataSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint mendapatkan data
app.get('/data', async (req, res) => {
    const allData = await Data.find();
    res.json(allData);
});

// Endpoint menambahkan data
app.post('/data', async (req, res) => {
    const { nama, umur, alamat } = req.body;
    if (!nama || !umur || !alamat) {
        return res.status(400).json({ message: 'Harap lengkapi semua data!' });
    }

    const newData = new Data({ nama, umur, alamat });
    await newData.save();
    
    res.json({ message: 'Data berhasil disimpan!', data: newData });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
