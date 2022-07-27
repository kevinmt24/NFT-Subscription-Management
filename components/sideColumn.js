import React, { useEffect, useState } from "react";
import contract from "./Medium";
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

const SideColumn = () => {
  const [tokenInput, setTokenInput] = useState("");
  const [token_amount, setTokenAmount] = useState("0");
  const [headerMessage, setHeaderMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);

//Fetching the amount of tokens the user already has.
  useEffect(() => {
    async function fetchTokens() {
      await contract
      .verifyUserHasToken("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
      .then(async (tx) => {
          const receipt = await tx.wait()
//Number of tokens recieved using EVENT-EMITTER in Solidity
          for (const event of receipt.events) {
            console.log(`Event ${event.event} with args ${event.args}`);

            setTokenAmount(event.args.toString());
          }
      });
    }
    fetchTokens().catch(console.error)
  },[]);

//Mint function to mint tokens where tokenInput = number of tokens required to mint.
  const mint = async () => {

    try {
        const result = await contract.mint(
          "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          tokenInput
         );
    
      setSuccessStatus(true);
      setHeaderMessage("Mint Successful !");
      setTimeout(function () {
        setHeaderMessage("");
        setSuccessStatus(false);
      }, 5000);
    } catch (e) {
     
    console.log(e.reason.substring(77));
      setErrorStatus(true);
      setHeaderMessage(e.reason.substring(77).toString());
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
            <Form onSubmit={mint}>
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