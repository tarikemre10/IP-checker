import React from 'react';

interface SearchBoxProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBox: React.FC<SearchBoxProps> = ({ searchQuery, setSearchQuery }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <input
            type="text"
            value={searchQuery}
            onChange={handleChange}
            placeholder="Search IP addresses..."
            style={styles.searchBox}
        />
    );
};

const styles = {
    searchBox: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        marginBottom: '20px',
        boxSizing: 'border-box' as const,
    },
};

export default SearchBox;
