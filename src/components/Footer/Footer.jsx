import React from 'react';
import './Footer.css';
import Container from '../Container/Container';

const Footer = ({textRights = "Escola Senai de Informatica - 2023"}) => {
    return (
        <footer className='footer-page'>
            <p className='footer-page__rights'>Todos os direitos reservados</p>
            {textRights}
        </footer>
    );
};

export default Footer;