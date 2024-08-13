import React from 'react';
import IpAddressItem from './IpAddressItem';

interface IpAddress {
  ip_address: string;
}

interface IpAddressListProps {
  ipAddresses: IpAddress[];
}

const IpAddressList: React.FC<IpAddressListProps> = ({ ipAddresses }) => {
  return (
      <div style={styles.container}>
        <ul style={styles.list}>
          {ipAddresses.map((ip, index) => (
              <IpAddressItem key={index} ipAddress={ip.ip_address} />
          ))}
        </ul>
      </div>
  );
};

const styles = {
  container: {
    maxHeight: '400px', // Set a maximum height for the container
    overflowY: 'auto',  // Enable vertical scrolling
    padding: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '0 auto',
    width: '100%',
  },
  list: {
    padding: '0',
    margin: '0',
    listStyleType: 'none' as const,
  },
};

export default IpAddressList;
