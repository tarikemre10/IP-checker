import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

interface RowData {
    [key: string]: string | number;
}

const ExcelProcessor: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [tableData, setTableData] = useState<RowData[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
            setError(null);
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            setError("Please upload a file first.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            // Upload the file to the server
            const response = await axios.post('http://127.0.0.1:8000/servers/check/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                responseType: 'arraybuffer', // Expect binary response for Excel file
            });

            // Process the response (Excel file)
            const workbook = XLSX.read(response.data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const data = XLSX.utils.sheet_to_json<RowData>(worksheet);

            setTableData(data);
        } catch (err) {
            console.error(err);
            setError("An error occurred while processing the file.");
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Excel Processor</h1>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} style={styles.fileInput} />
            <button onClick={handleSubmit} style={styles.button}>Upload and Process</button>
            {error && <p style={styles.error}>{error}</p>}
            {tableData.length > 0 && (
                <table style={styles.table}>
                    <thead>
                    <tr>
                        {Object.keys(tableData[0]).map((key) => (
                            <th key={key} style={styles.th}>{key}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index}>
                            {Object.values(row).map((value, i) => (
                                <td key={i} style={styles.td}>{String(value)}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center' as const,
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        fontSize: '24px',
        marginBottom: '20px',
        color: '#333',
    },
    fileInput: {
        marginBottom: '20px',
        fontSize: '16px',
    },
    button: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
    table: {
        width: '100%',
        marginTop: '20px',
        borderCollapse: 'collapse' as const,
    },
    th: {
        border: '1px solid #ddd',
        padding: '8px',
        backgroundColor: '#f2f2f2',
        textAlign: 'left' as const,
    },
    td: {
        border: '1px solid #ddd',
        padding: '8px',
    },
};

export default ExcelProcessor;
