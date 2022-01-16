import React from 'react';

const Header = ({setNavigation, navigation}) => {
    return (
        <header className="header">
            <h1>Agenda de Contactos</h1>
             <nav>
                <a 
                className={`btn-home ${navigation ? 'active' : ''}` }
                onClick={() => setNavigation(true)}
                >Inicio</a>
                <a
                className={`btn-home ${navigation ? '' : 'active'}` }
                onClick={() =>  setNavigation(false)}
                >Lista de Contactos</a>
         </nav>
      </header>
    );
};

export default Header;