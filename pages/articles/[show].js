import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import {Container, Divider, Grid, Button} from 'semantic-ui-react';
import styles from '../../styles/articlepage.module.css';
import { useRouter } from 'next/router'
import { getFirestore, getDocs, collection } from 'firebase/firestore'
import app from "../../firebase.config";


const db = getFirestore(app);

const ArticleShow = () => {
  const router = useRouter();
   const { show } = router.query;

  const [articleData,setArticleData] = useState([]);
  
  useEffect(() => {
    getDocs(collection(db,"articles"))
    .then((response) => {
      console.log("Reading...")
      setArticleData(response.docs.map((data) => {
          return {...data.data(), id: data.id}
      }))

    });
  }, []);

return(
  <div>
    {articleData.map((data) => {
      if(data.id == show)
       return (
        <Container>
        <Header />
        <Divider />
        <h2>{data.title}</h2>
        <h3>{data.name}</h3>
        <div style={{marginBottom: '30px'}}>
          <p className={styles.articleContent}>
            {data.desc}
          </p>
        </div>
        <div className={styles.subsection}>
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
              >
                <Button.Content visible>Continue Reading</Button.Content>
                <Button.Content hidden>Mint a token</Button.Content>
              </Button>
            </Grid.Row>
          </Grid>
        </div>
      </Container>
      );
    })}
  </div>
);
}


export default ArticleShow;