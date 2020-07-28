import React, { Component } from "react";
import '../styles/Rss.css'

type IProps = {
    url: string
};
type IState = {};

export default class Rss extends Component<IProps, IState> {
    render() {
        const feedUrl = this.props.url;
        return(
            <h1>here</h1>
        )
    }
}