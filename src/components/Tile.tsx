import React, { Component } from "react";
import Card from 'react-bootstrap/Card'
import { CardItem } from "./Page";
import '../styles/Tile.css'

type IProps = {
    card: CardItem
};
type IState = {};

export default class App extends Component<IProps, IState> {
    render() {
        const title = this.props.card.title;
        const link = this.props.card.link;
        return(
            <Card>
                <Card.Header className="title">{title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <a href={link}>Launch</a>
                </Card.Footer>
            </Card>
        )
    }
}