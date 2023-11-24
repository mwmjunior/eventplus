import React from 'react';
import Title from '../Title/Title';
import contatoMap from '../../assets/images/contato-map.png';
import './ContactSection.css';


const ContactSection = () => {
    return (
        <section>

            <Title titleText={"Contato"} />

            
            <div className="contato__endereco-box">
            <img 
            src={contatoMap}
            alt="Imagem de um mapa" 
            className='contato__img-map'
            />

            <p>
                Rua Niteroi, 180 - Centro <br />
                Sao Caetano do Sul - SP
                <a href="tel:+551142252000" 
                    className="contato__telefone" >

                        (11) 4225-2000

                    </a>
            </p>
            </div>

        </section>
    );
};

export default ContactSection;