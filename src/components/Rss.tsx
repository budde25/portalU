import React, { Component } from "react";
import Card from 'react-bootstrap/Card'
import '../styles/Rss.css'

type IProps = {
    title: string
};
type IState = {};

export default class Rss extends Component<IProps, IState> {
    render() {
        const cardTitle = this.props.title;
        return(
            <Card className="mb-4">
                <Card.Header className="title">{cardTitle}</Card.Header>
            </Card>
        )
    }
}