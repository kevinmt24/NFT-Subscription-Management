import React from 'react';
import { Button, Divider } from "semantic-ui-react";
import styles from '../styles/sideColumn.module.css';

const SideColumn = () => {
    return (
    <div>
        <div className={styles.sideheader}>
        DISCOVER MORE OF WHAT MATTERS TO YOU
        </div>
        <div style={{ marginBottom: "7px" }}>
        <Button style={{ margin: "4px" }} basic>Self</Button>
        <Button style={{ margin: "4px" }} basic>Relationships</Button>
        <Button style={{ margin: "4px" }} basic>Data Science</Button>
        <Button style={{ margin: "4px" }} basic>Programming</Button>
        <Button style={{ margin: "4px" }} basic>Productivity</Button>
        <Button style={{ margin: "4px" }} basic>Javascript</Button>
        <Button style={{ margin: "4px" }} basic>Machine Learning</Button>
        <Button style={{ margin: "4px" }} basic>Health</Button>
        </div>
        <Divider/>
        <div>
            <a className={styles.anchor}>Status</a>
            <a className={styles.anchor}>Writers</a>
            <a className={styles.anchor}>Blog</a>
            <a className={styles.anchor}>Help</a>
            <a className={styles.anchor}>Careers</a>
            

        </div>
    </div>);
}
export default SideColumn;