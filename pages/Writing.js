import React from "react";
import { Container, Menu, Link, Image, Button } from "semantic-ui-react";
import layout from "../components/Layout";

const Writing = () => {
  return (
    <Container style={{ marginTop: "20px" }}>
      <Menu secondary>
        <Image
          style={{ marginTop: "4px" }}
          src="https://links.papareact.com/yvf"
          size="small"
          layout="fill"
        />
        <Menu.Menu position="right">
          <Button>Publish</Button>
        </Menu.Menu>
      </Menu>
    </Container>
  );
};

export default Writing;
