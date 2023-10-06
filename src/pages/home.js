import React from 'react';

const homeStyles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    },
    heading: {
        textAlign: 'center',
        fontSize: '24px',
        marginBottom: '10px',
    },
    subheading: {
        textAlign: 'center',
        fontSize: '18px',
        marginBottom: '20px',
    },
    infoList: {
        listStyleType: 'none',
        padding: '0',
        fontSize: '16px',
    },
    infoListItem: {
        marginBottom: '10px',
    },
};

export function Home() {
    return (
        <div style={homeStyles.container} className="container my-5">
            <h1 style={homeStyles.heading}>Tugas CRUD JSON</h1>
            <p style={homeStyles.subheading}>Assignment 3 (Deadline: 7 Oktober 2023)</p>
            <ul style={homeStyles.infoList}>
                <li style={homeStyles.infoListItem}><strong>Nama:</strong> Muhammad Dimas Erlangga</li>
                <li style={homeStyles.infoListItem}><strong>Kelas:</strong> WDP-12-WebDev</li>
            </ul>
            <p>
                Buat aplikasi CRUD (JSON-nya bebas, boleh menggunakan Fetch API) yang mencangkup:
            </p>
            <ul style={homeStyles.infoList}>
                <li style={homeStyles.infoListItem}>GET all</li>
                <li style={homeStyles.infoListItem}>GET by id</li>
                <li style={homeStyles.infoListItem}>DELETE</li>
                <li style={homeStyles.infoListItem}>UPDATE</li>
                <li style={homeStyles.infoListItem}>CREATE</li>
            </ul>
        </div>
    );
};