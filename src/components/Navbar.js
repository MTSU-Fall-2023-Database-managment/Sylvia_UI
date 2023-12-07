import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button } from './Button';
import './Navbar.css';

function Navbar() {
    const [click, setClick]  = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <=960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton()
    },[]);

    window.addEventListener('resize',showButton);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        SYLVIA
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                      <FontAwesomeIcon icon={click ?  faXmark : faBars}></FontAwesomeIcon>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>   
                        <li>
                            <Link to='/dashboard' className='nav-links' onClick={closeMobileMenu}>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to='/analytics' className='nav-links' onClick={closeMobileMenu}>
                                Analytics
                            </Link>
                        </li>
                        <li>
                            <Link to='/news' className='nav-links' onClick={closeMobileMenu}>
                                News
                            </Link>
                        </li>
                        <li>
                            <Link to='/reviews' className='nav-links' onClick={closeMobileMenu}>
                                Reviews
                            </Link>
                        </li>
                        {!button && 
                            <li>
                                <Link to='/getdata' className='nav-links-mobile' onClick={closeMobileMenu}>
                                    Get Data
                                </Link>
                            </li>
                        }
                    </ul>
                    {button && <Button buttonStyle='btn--outline'>Get Data</Button>}
                </div>
            </nav>
        </>
    )
}

export default Navbar