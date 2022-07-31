import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import contract from "../../components/Medium.js";
import Link from "next/link";
import {
  Container,
  Divider,
  Grid,
  Button,
  Dimmer,
  Icon,
  Message,
} from "semantic-ui-react";
import styles from "../../styles/articlepage.module.css";
import { useRouter } from "next/router";
import {
  getFirestore,
  getDocs,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  setDoc,
} from "firebase/firestore";
import app from "../../firebase.config";

const db = getFirestore(app);

const ArticleShow = () => {
  const router = useRouter();

  const { show } = router.query;

  const [isHidden, setIsHidden] = useState(true);
  const [isErrorHidden, setIsErrorHidden] = useState(true);
  const [articleData, setArticleData] = useState([]);
  const [active, setActive] = useState("true");
  const [ethAddress, setEthAddress] = useState("No address");
  const [articleID, setArticleID] = useState("");

  //Getting Document details from the selected article.
  useEffect(() => {
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((result) => {
        setEthAddress(result[0]);
      });

    getDocs(collection(db, "articles")).then((response) => {
      console.log("Reading...");
      setArticleData(
        response.docs.map((data) => {
          if (show == data.id) {
            setArticleID(data.id);
          }
          return { ...data.data(), id: data.id };
        })
      );
    });
  
    //Verifying whether user has already used a token on particular article
    try {
      const docRef = doc(db, "users", ethAddress);
      getDoc(docRef).then(async (docSnap) => {
        if (docSnap.data()) {
          for (let id in docSnap.data().articlesOwned) {
            console.log(show + " : " + docSnap.data().articlesOwned[id]);
            if (show === docSnap.data().articlesOwned[id]) {
              console.log("Article is Found..");
              await setActive(false);
            }
          }
        }
      });
    } catch (e) {
      console.log("No articles bought so far!");
    }

  }, []);
  //UseAToken () burns a token to preview the article.
  const useToken = async () => {
    const result = await contract.useAToken(ethAddress);
    try {
      
      setIsHidden(false);
      console.log(result);

      //Adding Owned Articles to the user list on Firestore
      const articlesRef = await doc(db, "users", ethAddress);
      await updateDoc(articlesRef, {
        articlesOwned: arrayUnion(articleID),
      });

      setTimeout(function () {
        setActive(false);
      }, 2000);
    } catch (e) {
      console.log(e.message);
      setIsErrorHidden(false);
    }
  };

  return (
    <div>
      {articleData.map((data) => {
        if (data.id == show)
          return (
            <Container key={data.id}>
              <Header />
              <Divider />
              <Dimmer.Dimmable blurring={active} dimmed={active}>
                <h2>{data.title}</h2>
                <h3>{data.name}</h3>
                <div style={{ marginBottom: "30px" }}>
                  <p>{data.desc}</p>
                </div>
              </Dimmer.Dimmable>
              <Dimmer active={active}>
                <div>
                  <Grid centered className={styles.articlecontainer}>
                    <Grid.Row centered>
                      <h2 className={styles.subscribe}>
                        Access all of Medium with a membership, read this story
                        with an Ethereum account.
                      </h2>
                    </Grid.Row>
                    <Grid.Row>
                      <Button
                        size="large"
                        fluid
                        animated="fade"
                        color="black"
                        className={styles.subbutton}
                        onClick={useToken}
                      >
                        <Button.Content visible>
                          Continue Reading
                        </Button.Content>
                        <Button.Content hidden>
                          Verify your Medium token
                        </Button.Content>
                      </Button>
                    </Grid.Row>
                    <Message icon compact hidden={isHidden}>
                      <Icon name="circle notched" loading />
                      <Message.Content>
                        <Message.Header>Token Verified</Message.Header>
                        We are fetching that content for you.
                      </Message.Content>
                    </Message>
                    <Message negative hidden={isErrorHidden}>
                      <Message.Header>
                        Content cannot be accessed
                      </Message.Header>
                      <p>You currently dont have the required token.</p>
                    </Message>
                    <div className={styles.footer2}>
                      <Link href ='/'>
                        <div className={styles.footerText}>
                        Dont have enough tokens? Mint them now !
                        </div>
                      </Link>
                    </div>
                    <div className={styles.footer}>
                      <Link href = '/'>
                        <div className={styles.footerText}>
                          Get Back to Home Page
                        </div>
                      </Link>
                    </div>
                  </Grid>
                </div>
              </Dimmer>
            </Container>
          );
      })}
    </div>
  );
};

export default ArticleShow;
