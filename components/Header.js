import React from "react";
import { Button, Menu, Image } from "semantic-ui-react";
import { Link } from "../routes";
import styles from "../styles/Header.module.css";
import "semantic-ui-css/semantic.min.css";

const Header = () => {
  return (
    <div className={styles.HeaderMenu}>
      <Menu secondary>
        
          <Image style = {{marginTop: '4px'}}
            src="https://links.papareact.com/yvf"
            size="small"
            
            layout="fill"
          />
        <Menu.Menu position="right">
          <Link route="/Story">
            <a className="item">Our Story</a>
          </Link>
          <Link route="/">
            <a className="item">Membership</a>
          </Link>
          <Link route="/Writing">
            <a className="item">Write</a>
          </Link>
          <a className="item">
            <Button
              color="black"
              size="small"
              fluid
              circular
              content="Get Started"
            />
          </a>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default Header;
