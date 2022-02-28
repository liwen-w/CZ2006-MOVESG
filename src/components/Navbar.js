import { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

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

  window.addEventListener('resize',showButton);


  return (
    <>
        <nav className="navbar">
            <div className="navbar-container">
                <Link to ="/" className="navbar-logo">
                    MOVE SG <i class="fa-solid fa-person-walking"></i>
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                  <i class={click ? "fa-solid fa-xmark" : "fa-solid fa-bars"} />
                </div>

                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                  <li className='nav-item'>
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                      Home
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/favourites' className='nav-links' onClick={closeMobileMenu}>
                      Favourites
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/foodplaces' className='nav-links' onClick={closeMobileMenu}>
                      Food places
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/ecoplaces' className='nav-links' onClick={closeMobileMenu}>
                      Eco places
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/history' className='nav-links' onClick={closeMobileMenu}>
                      History
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/login' className='nav-links-mobile' onClick={closeMobileMenu}>
                      Login/Register
                    </Link>
                  </li>
                </ul>
                {button && <Button buttonStyle='btn--outline'>Login/Register</Button>}


            </div>
        </nav>




    </>
  )
}

export default Navbar