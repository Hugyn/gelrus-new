import React from 'react'
//-------Material UI--------
import Container from '@material-ui/core/Container';

//-------Styles--------
import styles from "./Navbar.module.css"

//-------Components--------
import  MenuItem  from './MenuItem';
import Card from '../home/Card';

import { useRouter } from 'next/router'



const navItems = [{name:"Home", link:""},
 {name:"Gelru's work", link: "gelrus-work"},
  {name:"Services & prices", link: "services"},
  {name:"Book a session", link:"booking"},
  {name: "About Gelru's", link:"about"},
  {name:'Contact', link:"contact"},
  {name: "Cancel Session", link:"cancel-booking"}];

const cards = [
    {title: "Manicure", id:1, image: "manicure.png" },
    {title: "Pedicure", id:2, image: "pedicure.png" },
    {title: "Treatment", id:3, image: "treatment.png" },
    {title: "Podiatry", id:4, image: "podiatry.png" },
]


function DesktopNavbar() {

    return (
        <div className={styles.desktopNavbarContainer}>
            <Container>
                <div className={styles.desktopNavbar}>
                        <img className={styles.logo} src="/Logo.svg" alt="Gelru's Logo"/>
                    <div className={styles.desktopNavLinksContainer}>
                        {navItems.map((item,index)=> 
                            (
                                <MenuItem className={styles.desktopNavLinks} key={index} link={`/${item.link}`}>
                                    {item.name}
                                </MenuItem>

                            )
                        )}
                       
                    </div>
                </div>
                <div className={styles.cardsContainer}>
                    {cards.map((item)=> 
                    <Card  key={item.id} id={item.id} title={item.title} image={item.image}/>
                    )}
                </div>
            </Container>
        </div>
    )
}

export default DesktopNavbar
