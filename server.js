const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 5000;
const DATA_FILE = "data.json";

app.use(express.json());
app.use(cors());

// Fungsi membaca data JSON
const readData = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return []; // Jika file tidak ditemukan atau error, kembalikan array kosong
    }
};

// Fungsi menyimpan data ke JSON
const saveData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 4));
};

// API untuk menyimpan data dari frontend
app.post("/save_data", (req, res) => {
    const newData = req.body;
    const allData = readData();
    allData.push(newData);
    saveData(allData);
    res.json({ message: "Data berhasil disimpan!", data: allData });
});

// API untuk mengambil data dan mengirim ke frontend
app.get("/get_data", (req, res) => {
    res.json(readData());
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
const cors = require("cors");
app.use(cors({ origin: "*" })); // Izinkan semua domain
