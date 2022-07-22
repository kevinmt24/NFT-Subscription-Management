import React, {useState, useEffect } from "react";
import { Button, Menu, Image } from "semantic-ui-react";
import { Link } from "../routes";
import styles from "../styles/Header.module.css";
import "semantic-ui-css/semantic.min.css";


const Header = () => {

const [errorMessage, setErrorMessage] = useState(null);
const [defaultAccount, setDefaultAccount] = useState(null);
const [connectButtonText,setConnectButtonText] = useState('Connect Wallet');
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  window.ethereum.request({method : 'eth_requestAccounts'})
  .then(result => {
      setDefaultAccount(result[0]);
      setIsLoading(false);
      setConnectButtonText(result[0].substring(0,4) + "..." + result[0].slice(result[0].length - 4));
  });
});

const connectWalletHandler = () => {

  setIsLoading(true);

  if (!window.ethereum) {
    setErrorMessage("MetaMask not detected. Please try again from a MetaMask enabled browser.");
    setIsLoading(false);
    
  }
  else {
    window.ethereum.request({method : 'eth_requestAccounts'})
    .then(result => {
        setDefaultAccount(result[0]);
        setConnectButtonText(result[0].substring(0,4) + "..." + result[0].slice(result[0].length - 4));
        setIsLoading(false);
    });
  }
  
};


  return (
    <div className={styles.HeaderMenu}>
      <Menu secondary>
        <Link route = '/  '>
        <Image
          style={{ marginTop: "4px" }}
          src="https://links.papareact.com/yvf"
          size="small"
          layout="fill"
        />
        </Link>
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
              onClick={connectWalletHandler}
              color="black"
              size="small"
              fluid
              circular
              content={connectButtonText}
              loading = {isLoading}
            />

          </a>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default Header;
