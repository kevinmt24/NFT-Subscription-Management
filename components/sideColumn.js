import React, { useEffect, useState } from "react";
import contract from "./Medium.js";
const { ethers } = require("ethers");
import {
  Button,
  Divider,
  Message,
  Input,
  Segment,
  Form,
  Container,
} from "semantic-ui-react";
import styles from "../styles/sideColumn.module.css";
import { Loading } from "web3uikit";

const SideColumn = () => {
  const [tokenInput, setTokenInput] = useState("");
  const [token_amount, setTokenAmount] = useState("0");
  const [headerMessage, setHeaderMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const [ethAddress, setEthAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //Fetching the amount of tokens the user already has.
  useEffect(() => {
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((result) => {
        setEthAddress(result[0]);
      });

    async function getBalance() {
      const result = await contract.getTokenBalance(ethAddress);
      setTokenAmount(result.toString());
    }
    getBalance().catch(console.error);
  }, [ethAddress]);

  //Mint function to mint tokens where tokenInput = number of tokens required to mint.
  const mintToken = async () => {
    try {
      //MINT FUNCTION
      setIsLoading(true);
      const result = await contract.mint(ethAddress, tokenInput);
      await result.wait();
      console.log(result);
      setIsLoading(false);
      //GETTING BALANCE FUNCTION
      const tokenresult = await contract.getTokenBalance(ethAddress);
      setTokenAmount(tokenresult.toString());
      setSuccessStatus(true);
      setHeaderMessage("Mint Successful !");

      setTimeout(function () {
        setHeaderMessage("");
        setSuccessStatus(false);
      }, 5000);
    } catch (e) {
      setIsLoading(false);
      setHeaderMessage("Mint Unsuccessful!"); 
      setErrorStatus(true);

      setTimeout(function () {
        setHeaderMessage("");
        setErrorStatus(false);
      }, 5000);
    }
  };

  return (
    <div className={styles.container}>
      <Segment clearing placeholder textAlign="center">
        <Container>
          <h2 className={styles.mintHeader}>Mint Tokens Now!</h2>
          <div style={{ paddingLeft: "40px", paddingTop: "20px" }}>
            <Form loading={isLoading} onSubmit={mintToken}>
              <Form.Group>
                <Form.Field
                  id="form-input-control-first-name"
                  control={Input}
                  value={tokenInput}
                  onChange={(e) => {
                    setTokenInput(e.target.value);
                  }}
                  placeholder="No. of Tokens"
                  width={16}
                />
                <Form.Field
                  id="form-button-control-public"
                  control={Button}
                  content="Mint"
                  width={4}
                />
              </Form.Group>
            </Form>
          </div>
          <Message error={errorStatus} success={successStatus}>
            <Message.Header>{headerMessage}</Message.Header>
            <p>You currently have {token_amount} Tokens.</p>
          </Message>
        </Container>
      </Segment>
      <div className={styles.sideheader}>
        DISCOVER MORE OF WHAT MATTERS TO YOU
      </div>
      <div style={{ marginBottom: "7px" }}>
        <Button style={{ margin: "4px" }} basic>
          Self
        </Button>
        <Button style={{ margin: "4px" }} basic>
          Relationships
        </Button>
        <Button style={{ margin: "4px" }} basic>
          Data Science
        </Button>
        <Button style={{ margin: "4px" }} basic>
          Programming
        </Button>
        <Button style={{ margin: "4px" }} basic>
          Productivity
        </Button>
        <Button style={{ margin: "4px" }} basic>
          Javascript
        </Button>
        <Button style={{ margin: "4px" }} basic>
          Machine Learning
        </Button>
        <Button style={{ margin: "4px" }} basic>
          Health
        </Button>
      </div>
      <Divider />
    </div>
  );
};
export default SideColumn;
