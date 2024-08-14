import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IpAddressList from '../components/IpAddressList';
import SearchBox from '../components/SearchBox';
import { useNavigate } from 'react-router-dom';
import Header from '../components/HomeHeader';

interface IpAddress {
    ip_address: string;
}

const HomePage: React.FC = () => {
    const [ipAddresses, setIpAddresses] = useState<IpAddress[]>([]);
    const [filteredIpAddresses, setFilteredIpAddresses] = useState<IpAddress[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const fetchIpAddresses = async () => {
            try {
                const response = await axios.get<IpAddress[]>('http://127.0.0.1:8000/servers/ip-addresses/');
                setIpAddresses(response.data);
                setFilteredIpAddresses(response.data);
                setLoading(false);
            } catch (error) {
                if (axios.isAxiosError(error) && error.message) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
                setLoading(false);
            }
        };

        fetchIpAddresses();
    }, []);

    const navigate = useNavigate();

    const handleNavigateToUploadFile = () => {
        navigate('/upload-file');
    };

    const handleNavigateToCheckFile = () => {
        navigate('/check-file');
    };


    const handleDeleteInactiveIps = () => {
        navigate('/delete-inactive-files');
    };

    useEffect(() => {
        const filtered = ipAddresses.filter(ip =>
            ip.ip_address.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredIpAddresses(filtered);
    }, [searchQuery, ipAddresses]);

    if (loading) {
        return <div style={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div style={styles.error}>Error: {error}</div>;
    }

    return (
        <div style={styles.container}>
            <Header/>
            <div style={styles.mainContent}>
                <div style={styles.content}>
                    <h1 style={styles.heading}>Active IP Addresses</h1>
                    <div style={styles.listContainer}>
                        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                        <IpAddressList ipAddresses={filteredIpAddresses}/>
                    </div>
                </div>
                <div style={styles.buttonsContainer}>
                    <button onClick={handleNavigateToUploadFile} style={styles.button}>
                        Upload Active IP addresses
                    </button>
                    <button onClick={handleDeleteInactiveIps} style={styles.button}>
                        Upload Inactive IP addresses
                    </button>
                    <button onClick={handleNavigateToCheckFile} style={styles.button}>
                        Check the status of your file
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '100%', // Responsive width
        margin: '0 auto',
        backgroundColor: '#f5f5f5',
        borderRadius: '0.5rem', // Responsive border radius
        boxShadow: '0 0 0.625rem rgba(0, 0, 0, 0.1)', // Responsive shadow
    },
    mainContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '2rem',
    },
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem', // Space inside the frame
        border: '2px solid #ccc', // Border to create the frame
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Optional shadow for a more pronounced frame effect
        backgroundColor: '#fff', // Background color inside the frame
    },
    heading: {
        fontSize: '2.5rem', // Responsive font size
        marginBottom: '1.5rem', // Responsive margin
        color: '#333',
    },
    loading: {
        textAlign: 'center' as const,
        fontSize: '1.125rem', // Responsive font size
        color: '#555',
    },
    error: {
        color: 'red',
        fontSize: '1.125rem', // Responsive font size
        textAlign: 'center' as const,
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%', // Full width
        maxHeight: '60vh', // Maximum height with scrolling
        overflowY: 'auto', // Enable vertical scrolling
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        marginLeft: '10rem',
    },
    button: {
        width: '80%',
        marginTop: '1rem', // Responsive margin
        padding: '0.75rem 1.5rem', // Responsive padding
        fontSize: '1rem', // Responsive font size
        borderRadius: '0.25rem', // Responsive border radius
        border: 'none',
        backgroundColor: '#61dafb',
        color: 'white',
        cursor: 'pointer',
    },
};

export default HomePage;
