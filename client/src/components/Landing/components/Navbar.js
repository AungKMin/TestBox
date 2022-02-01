import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';

import './Navbar.css';
import notesLogo from '../../../images/notesLogo2.png';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <p className='text'>ProdOrg</p>
            <i class='fab fa-typo3' />
            <img src={notesLogo} alt="notes" height="40px" />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/posts' className='nav-links' onClick={closeMobileMenu}>
                <p className='text'>View your Submissions</p>
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline' link='/auth'>SIGN UP</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
