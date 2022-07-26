import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import moment from "moment";

import {
  Container,
  Menu,
  Image,
  Form,
  Message,
} from "semantic-ui-react";

import Layout from "../components/Layout";
import app from "../firebase.config";
import { collection, addDoc, getFirestore } from "firebase/firestore";

const Writing = () => {

  const [formStatus, setFormStatus] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage,setErrorMessage] = useState("");
  const [ethAddress, setEthAddress] = useState("");
  const router = useRouter();
  
  window.ethereum.request({method : 'eth_requestAccounts'})
    .then(result => {
        setEthAddress(result[0]);
    });


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    desc: "",
    date: moment().format("MMM Do YY")
  });

 

  const db = getFirestore(app);

  const writeUserData = async () => {
    if(ethAddress = "") {
      setErrorMessage("Please connect to your Metamask account.");
      setErrorStatus(true);
      
    }
    const docRef = await addDoc(collection(db, "articles"), {...formData,address: ethAddress})
    .catch((e) => {
      console.log(e.message);
      setErrorMessage("Publish Failed");
      setErrorStatus(true);
    });
    console.log("Document written with ID: ", docRef.id);
    setFormStatus(true);
   
    setTimeout(() => {
      router.push('/');
    },1000);
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Menu secondary>
        <a href="/">
          <Image
            style={{ margin: "10px" }}
            src="https://links.papareact.com/yvf"
            size="small"
            layout="fill"
          />
        </a>
       
      </Menu>

      <Form success={formStatus} error = {errorStatus} onSubmit = {writeUserData}>
      <Form.Input fluid label='Wallet Address' placeholder={ethAddress} readOnly />
        <Form.Field
          required
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
        >
          <label>Aritst Name</label>
          <input placeholder="Artist Name" />
        </Form.Field>
        <Form.Field
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        >
          <label>Email Address</label>
          <input placeholder="Artist Name" />
        </Form.Field>

        <Form.Field
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        >
          <label>Title </label>
          <input placeholder="Title of the article" />
        </Form.Field>
        <Form.TextArea
          label="Description"
          value={formData.desc}
          onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
        />
        <Form.Button content = "Publish"/>
        <Message
          success
          header="Form Completed"
          content="You're all signed up for the newsletter"
        />
        <Message
          error
          header="Action Forbidden"
          content={errorMessage}
        />
      </Form>
    </Container>
  );
};

export default Writing;
