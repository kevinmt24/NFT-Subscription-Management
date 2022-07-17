import React from "react";
import Header from "../components/Header";
import { Container, Divider, Button, Grid } from "semantic-ui-react";
import styles from "../styles/articlepage.module.css";

const ArticlePage = () => {
  return (
    <Container>
      <Header />
      <Divider />
      <h2>Différance: How To Think Critically In The Age of Content</h2>
      <h3>from Plato to Derrida</h3>
      <div style={{marginBottom: '30px'}}>
        <p className={styles.articleContent}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum. <br />
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. <br />
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum.
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
              <Button.Content visible>Get Membership access</Button.Content>
              <Button.Content hidden>0.05 ETH</Button.Content>
            </Button>
          </Grid.Row>
        </Grid>
      </div>
    </Container>
  );
};

export default ArticlePage;
