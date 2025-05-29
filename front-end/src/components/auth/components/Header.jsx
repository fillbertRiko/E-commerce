import React from 'react';

const Header = () => {
    return (
        <header style={styles.header}>
            <h1 style={styles.title}>E-Commerce</h1>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#1976d2',
        padding: '16px 0',
        textAlign: 'center',
    },
    title: {
        color: '#fff',
        margin: 0,
        fontSize: '2rem',
        letterSpacing: '2px',
    },
};

export default Header;