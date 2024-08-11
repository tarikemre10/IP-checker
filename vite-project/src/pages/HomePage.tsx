import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/HomeHeader';
import SearchBar from '../components/SearchBar';
import IpAddressList from '../components/IpAddressList';

interface IpAddress {
    id: number;
    address: string;
}

const HomePage: React.FC = () => {
    const [ipAddresses, setIpAddresses] = useState<IpAddress[]>([
        { id: 1, address: '192.168.1.1' },
        { id: 2, address: '192.168.1.2' },
        { id: 3, address: '192.168.1.3' },
    ]);

    const [filteredIps, setFilteredIps] = useState<IpAddress[]>(ipAddresses);

    const handleSearch = (query: string) => {
        const filtered = ipAddresses.filter((ip) =>
            ip.address.includes(query)
        );
        setFilteredIps(filtered);
    };

    const handleControl = (id: number) => {
        alert(`Control IP Address with ID: ${id}`);
    };

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/ip-list');
    };

    const handleNavigateToUploadFile = () => {
        navigate('/upload-file');
    };

    return (
        <div>
            <Header/>
            <SearchBar onSearch={handleSearch}/>
            <IpAddressList ipAddresses={filteredIps} onControl={handleControl}/>
            <button onClick={handleNavigate} style={styles.button}>
                Active Ip List
            </button>
            <button onClick={handleNavigateToUploadFile} style={styles.button}>
                Upload Excel File
            </button>
        </div>
    );
};

const styles = {
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '1rem',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#61dafb',
        color: 'white',
        cursor: 'pointer',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
};

export default HomePage;
