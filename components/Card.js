import React from "react";
import { Grid, Image, Divider } from "semantic-ui-react";
import { Link } from "../routes";
import styles from '../styles/Card.module.css'


const Article = () => {
  return (
    
      <div>
        <Grid>
          <Grid.Column width={11}>
            <div className={styles.artist}>Artist Name goes here</div>
            <a href= '/articlepage'><div className={styles.title}>Title goes here</div></a>
            <a href= '/articlepage' style={{color : 'black'}}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It
            </a>
            <div className={styles.stats}>
            <span> Jun 11  ·  6 min read   <span>Productivity</span></span>
            </div>
            <Divider />
          </Grid.Column>
          <Grid.Column width={4} >
            <Image
              className= {styles.cardImage}
              src="https://via.placeholder.com/200x132.png"
            />
          </Grid.Column>
        </Grid>
      </div>
  );
};

export default Article;
