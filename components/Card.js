import React, { useState, useEffect } from "react";
import { Grid, Image, Divider } from "semantic-ui-react";
import styles from "../styles/Card.module.css";
import {
  collection,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import app from "../firebase.config";
import Link from "next/link";

const db = getFirestore(app);

const Article = () => {

  const [articleData, setArticleData] = useState([]);
  //Getting List of Article data from Firebase Firestore using getDocs()
  useEffect(() => {
    const q = query(collection(db, "articles"));
    getDocs(collection(db, "articles")).then((response) => {
      console.log("Reading...");
      setArticleData(
        response.docs.map((data) => {
          return { ...data.data(), id: data.id };
        })
      );
    });
  }, []);

  return (
    <div>
      {articleData.map((data) => {
        return (
          <Grid>
            <Grid.Column width={11}>
              <div className={styles.artist}>{data.name}</div>
              <Link href={"/articles/" + data.id}>
                <a>
                  <div className={styles.title}>{data.title}</div>
                </a>
              </Link>
              <Link href={"/articles/" + data.id}>
                <a style={{ color: "black" }}>
                  <p className={styles.paradesc}> {data.desc + " ..."} </p>
                </a>
              </Link>
              <div className={styles.stats}>{data.date}</div>
              <Divider />
            </Grid.Column>
            <Grid.Column width={4}>
              <img
                className={styles.cardImage}
                src="https://via.placeholder.com/200x132.png"
                alt="News article thumbnail"
              />
            </Grid.Column>
          </Grid>
        );
      })}
    </div>
  );
};

export default Article;
