import React from 'react';

const Footer = () => (
    <footer style={styles.footer}>
        <div style={styles.container}>
            <span>&copy; {new Date().getFullYear()} E-commerce. All rights reserved.</span>
        </div>
    </footer>
);

const styles = {
    footer: {
        background: '#f5f5f5',
        padding: '16px 0',
        textAlign: 'center',
        borderTop: '1px solid #e0e0e0',
        marginTop: 'auto',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        color: '#888',
        fontSize: '14px',
    },
};

export default Footer;