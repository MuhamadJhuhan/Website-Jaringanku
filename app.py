from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

def init_db():
    conn = sqlite3.connect('database.db')

    conn.execute("""
    CREATE TABLE IF NOT EXISTS pesanan(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nama TEXT,
        wa TEXT,
        alamat TEXT,
        layanan TEXT,
        mbps INTEGER
    )
    """)

    conn.close()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/simpan_pesanan', methods=['POST'])
def simpan_pesanan():

    data = request.json

    print("DATA MASUK:", data)

    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO pesanan
        (nama, wa, alamat, layanan,MBPS)
        VALUES (?, ?, ?, ?, ?)
    """, (
        data['nama'],
        data['wa'],
        data['alamat'],
        data['layanan'],
        data['MBPS']
    ))

    conn.commit()
    conn.close()

    print("BERHASIL DISIMPAN")

    return jsonify({"status": "berhasil"})

if __name__ == '__main__':
    init_db()
    app.run(debug=True)