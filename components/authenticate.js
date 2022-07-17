import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Web3 from "web3";
import { Button, Grid, Image } from "semantic-ui-react";

const Authenticate = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
   try{
      console.log(Web3.eth.coinbase);
      
   }
   catch(e) {
      console.log("Web3 accounts not received");
   }
    
  });

  return isConnected ? (
    <Layout />
  ) : (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Image src="https://links.papareact.com/yvf" />

        <Button
          onClick={async () => {setIsConnected(await window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then(console.log("Connected"))) ? true : false}}
          color="black"
          fluid
          size="large"
          style={{ marginTop: "40px" }}
        >
          Connect with Metamask
        </Button>
      </Grid.Column>
    </Grid>
  );
};

export default Authenticate;
