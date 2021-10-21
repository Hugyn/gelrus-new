import {useState, React} from 'react'
import DesktopNavbar from './DesktopNavbar';


//-------Components--------
import MobileNavbar from './MobileNavbar';

function Navbar() {

    return (
        <div>
          <MobileNavbar/>
          <DesktopNavbar/> 
        </div>
    )
}


  

export default Navbar;
