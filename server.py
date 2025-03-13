from flask import Flask, request, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Mengizinkan akses dari frontend

# Nama file JSON untuk menyimpan data
DATA_FILE = "data.json"

# Fungsi untuk membaca data dari JSON
def read_data():
    try:
        with open(DATA_FILE, "r") as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return []  # Jika file tidak ada atau rusak, kembalikan list kosong

# Fungsi untuk menyimpan data ke JSON
def save_data(data):
    with open(DATA_FILE, "w") as file:
        json.dump(data, file, indent=4)

# API untuk menyimpan data dari frontend
@app.route("/save_data", methods=["POST"])
def save():
    new_data = request.json
    all_data = read_data()
    all_data.append(new_data)
    save_data(all_data)
    return jsonify({"message": "Data berhasil disimpan!", "data": all_data})

# API untuk mengambil data dan mengirim ke frontend
@app.route("/get_data", methods=["GET"])
def get():
    return jsonify(read_data())

if __name__ == "__main__":
    app.run(debug=True)
if __name__ == "__main__":
    app.run(host="0.0.0.0")
    from threading import Thread
from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Server Flask Aktif!"

def keep_alive():
    import requests
    while True:
        requests.get("https://my-flask-app.repl.co")
        time.sleep(300)  # Setiap 5 menit

# Jalankan keep_alive() di background
Thread(target=keep_alive, daemon=True).start()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

