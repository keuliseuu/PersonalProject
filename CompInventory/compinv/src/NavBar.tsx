import React from 'react';
import ecimLogo from '/resistor-nema-system.png';
import './index.css';

function Navbar() {

    const navText: React.CSSProperties = {
        color: 'white',  
        marginLeft: '30px'
    };

    return (
        <nav className="navbar navbar-default bg-dark navbar-fixed-top" id="navColor">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">
                        <img src={ecimLogo} width="100" height="100" />
                        <span style={navText}>Electronic Component Inventory</span>
                    </a>
                </div>
                
            </div>
        </nav>
    );
}

export default Navbar;