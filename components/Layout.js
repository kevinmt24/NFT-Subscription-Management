import React from "react";
import { Container, Divider, Grid } from "semantic-ui-react";
import Head from "next/head";
import Header from "./Header";
import Articles from '../components/Card';
import SideColumn from './sideColumn'
// import { app, database } from '../firebase.config';
// import { collection, addDoc } from 'firebase/firestore';


// const getArticles = () => {
//   getDocs(dbInstance)
//       .then((data) => {
//           console.log(data);
//       })
// }


const Layout = (props) => {

  return (
     <div>
      <Container>
        <Head>
        </Head>
        <Header/>
        <Divider/>
        <Grid columns={2} >
            <Grid.Column width={10}>
                <Articles/>
                <Articles/>
                <Articles/>
                <Articles/>

            </Grid.Column>
            <Grid.Column width = {6}>
                <SideColumn/>
            </Grid.Column>
        </Grid>

        {props.children}
      </Container>
    </div> 
  );
};
export default Layout;
