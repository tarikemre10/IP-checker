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
    <ul>
      {ipAddresses.map((ip, index) => (
        <IpAddressItem key={index} ipAddress={ip.ip_address} />
      ))}
    </ul>
  );
};

export default IpAddressList;