from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

# =========================
# DATABASE
# =========================
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

    conn.commit()
    conn.close()


# =========================
# HALAMAN UTAMA
# =========================
@app.route('/')
def home():
    return render_template('index.html')


# =========================
# SIMPAN PESANAN
# =========================
@app.route('/simpan_pesanan', methods=['POST'])
def simpan_pesanan():

    data = request.get_json()

    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO pesanan
        (nama, wa, alamat, layanan, mbps)
        VALUES (?, ?, ?, ?, ?)
    """, (
        data['nama'],
        data['wa'],
        data['alamat'],
        data['layanan'],
        data['MBPS']
    ))

    conn.commit()

    id_baru = cursor.lastrowid

    conn.close()

    return jsonify({
        "success": True,
        "id": id_baru,
        "message": "Pesanan berhasil disimpan"
    })
    


# =========================
# AMBIL SEMUA PESANAN
# =========================
@app.route('/get_pesanan')
def get_pesanan():

    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM pesanan
        ORDER BY id DESC
    """)

    data = [dict(row) for row in cursor.fetchall()]

    conn.close()

    return jsonify(data)


# =========================
# HAPUS PESANAN
# =========================
@app.route('/hapus_pesanan/<int:id>', methods=['DELETE'])
def hapus_pesanan(id):

    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM pesanan WHERE id = ?",
        (id,)
    )

    conn.commit()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Pesanan berhasil dihapus"
    })

@app.route('/edit_pesanan/<int:id>', methods=['PUT'])
def edit_pesanan(id):

    data = request.get_json()

    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE pesanan
        SET nama = ?, wa = ?, alamat = ?, layanan = ?, mbps = ?
        WHERE id = ?
    """, (
        data['nama'],
        data['wa'],
        data['alamat'],
        data['layanan'],
        data['mbps'],
        id
    ))

    conn.commit()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Pesanan berhasil diupdate"
    })

# =========================
# JALANKAN APP
# =========================
if __name__ == '__main__':
    init_db()
    app.run(debug=True)