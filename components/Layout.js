import React from "react";
import { Container, Divider, Grid } from "semantic-ui-react";
import Header from "./Header";
import SideColumn from "./sideColumn";
import Article from "./Card";

//Providing a Layout to the Website
const Layout = (props) => {
  return (
    <div>
      <Container>
        <Header />
        <Divider />
        <Grid columns={2}>
          <Grid.Column width={10}>
            <Article />
          </Grid.Column>
          <Grid.Column width={6}>
            <SideColumn />
          </Grid.Column>
        </Grid>

        {props.children}
      </Container>
    </div>
  );
};
export default Layout;
