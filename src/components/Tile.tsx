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
            <li className="list-group-item border-0">
            <Card className="mb-4">
                <Card.Header className="title">{title}</Card.Header>
                <Card.Img className="img-fluid" src="//placehold.it/500x280">
                </Card.Img>
                <Card.Footer>
                    <a href={link}>Launch</a>
                </Card.Footer>
            </Card>
            </li>
        )
    }
}