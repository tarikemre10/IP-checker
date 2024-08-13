import React, { useState } from 'react';

const FileUploadPage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                const response = await fetch('http://127.0.0.1:8000/servers/delete-inactives/', {
                    method: 'POST',
                    body: formData,
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                alert('File uploaded successfully');
            } catch (error) {
                alert('Error uploading file: ' + (error as Error).message);
            }
        } else {
            alert('Please select a file first');
        }
    };

    return (
        <div style={styles.container}>
            <h1>Upload an Excel File</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                    style={styles.fileInput}
                />
                <button type="submit" style={styles.button}>
                    Upload File
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center' as 'center',
    },
    fileInput: {
        marginTop: '10px',
        marginBottom: '10px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#61dafb',
        color: 'white',
        cursor: 'pointer',
    },
};

export default FileUploadPage;
