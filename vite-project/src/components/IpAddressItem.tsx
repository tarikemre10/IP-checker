import React from 'react';

interface IpAddressItemProps {
  ipAddress: string;
}

const IpAddressItem: React.FC<IpAddressItemProps> = ({ ipAddress }) => {
  return <li>{ipAddress}</li>;
};

export default IpAddressItem;