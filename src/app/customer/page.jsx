"use client";
import styles from './CustomerPage.module.css';
import { useEffect, useState } from 'react';

export default function CustomerPage() {

  const [formVisible, setFormVisible] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [nama, setNama ] = useState('');
  const [telepon, setTelepon ]= useState('');
  const [email, setEmail ] = useState('');
  const [msg, setMsg ] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchCustomers = async () => {
    const res = await fetch('/api/customer');
    const data = await res.json();
    setCustomers(data);
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editId ? 'PUT' : 'POST';
        const url = editId ? `/api/customer/${editId}` : '/api/customer';
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nama, telepon, email }),
        });

        if (res.ok) {
            setMsg('Berhasil disimpan');
            setNama('');
            setTelepon('');
            setEmail('');
            setEditId(null);
            setFormVisible(false);
            fetchCustomers();
        } else {
            setMsg('Gagal menyimpan data');
        }
    };

    const handleEdit = (item) => {
        setNama(item.nama);
        setTelepon(item.telepon);
        setEmail(item.email);
        setEditId(item.id);
        setFormVisible(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Yakin hapus data ini?')) return;

        await fetch(`/api/customer/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });

        fetchCustomers();
    };

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Ayam Penyet Koh Eddy</h1>
        <button
            className={styles.buttonToggle}
            onClick={() => setFormVisible(!formVisible)}>
            {formVisible ? 'Tutup Form' : 'Tambah Data'}
        </button>
        
        {formVisible && (
            <div className={styles.formWrapper}>
                <h3>Input Data Baru</h3>
                <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <span>Nama</span>
                    <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Masukkan Nama"
                    required
                    />
                </div>
                <div className={styles.formGroup}>
                    <span>Telepon</span>
                    <input
                    type="text"
                    value={telepon}
                    onChange={(e) => setTelepon(e.target.value)}
                    placeholder="Masukkan Nomor Telepon"
                    required
                    />
                </div>
                <div className={styles.formGroup}>
                    <span>Email</span>
                    <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan Email"
                    required
                    />
                </div>
                <button type="submit">
                    Simpan
                </button>
                <p>{msg}</p>
                </form>
            </div>
        )}

        <div className={styles.tableWrapper}>
            <table>
                <thead>
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Telepon</th>
                    <th>Email</th>
                    <th>Aksi</th>
                </tr>
                </thead>
                <tbody style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    {customers.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.nama}</td>
                            <td>{item.telepon}</td>
                            <td>{item.email}</td>
                            <td>
                                <button onClick={() => handleEdit(item)}>Edit</button>
                                <button onClick={() => handleDelete(item.id)}>Hapus</button>
                            </td>
                        </tr>
                    ))}
                    {customers.length === 0 && (
                        <tr>
                            <td colSpan="5">Belum ada data</td>
                        </tr>
                    )}
                </tbody>
            </table>    
        </div>
    </div>
  );
}