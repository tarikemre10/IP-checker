import React from 'react';

interface IpAddressItemProps {
  ipAddress: string;
}

const IpAddressItem: React.FC<IpAddressItemProps> = ({ ipAddress }) => {
  return <li style={styles.listItem}>{ipAddress}</li>;
};

const styles = {
  listItem: {
    padding: '10px 15px',
    margin: '8px 0',
    backgroundColor: '#e0f7fa',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontSize: '16px',
    color: '#00796b',
    listStyleType: 'none' as const,
  },
};

export default IpAddressItem;
