import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IpAddressList from '../components/IpAddressList';

interface IpAddress {
    ip_address: string;
}

const IpListPage: React.FC = () => {
    const [ipAddresses, setIpAddresses] = useState<IpAddress[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchIpAddresses = async () => {
            try {
                const response = await axios.get<IpAddress[]>('http://127.0.0.1:8000/servers/ip-addresses/');
                setIpAddresses(response.data);
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="App">
            <h1>List of IP Addresses</h1>
            <IpAddressList ipAddresses={ipAddresses} />
        </div>
    );
};

export default IpListPage;
