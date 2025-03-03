from flask import Flask, request, jsonify, send_from_directory
import json
import os

app = Flask(__name__)

DATA_FILE = "data.json"

# Pastikan file JSON ada
if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, "w") as f:
        json.dump([], f)

# Fungsi untuk membaca data dari JSON
def read_data():
    with open(DATA_FILE, "r") as f:
        return json.load(f)

# Fungsi untuk menulis data ke JSON
def write_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=4)

@app.route('/')
def serve_index():
    return send_from_directory('', 'index.html')

@app.route('/submit', methods=['POST'])
def submit_name():
    data = request.json
    name = data.get('name')

    if name:
        names = read_data()
        names.append(name)  # Tambah nama ke list
        write_data(names)  # Simpan kembali ke JSON
        return jsonify({"message": "Nama berhasil disimpan!"})
    
    return jsonify({"error": "Nama tidak boleh kosong!"}), 400

@app.route('/names', methods=['GET'])
def get_names():
    return jsonify(read_data())

if __name__ == '__main__':
    app.run(debug=True)
