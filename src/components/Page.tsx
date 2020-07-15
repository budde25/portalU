import React, { Component } from "react";
import CardColumns from 'react-bootstrap/CardColumns'
import Tile from './Tile'
import '../styles/Page.css'

export enum PageType {
    Tiles,
    RSS,
}

export class PageItem {
    title: string;
    type: PageType;
    constructor(title: string, type: PageType) {
        this.title = title;
        this.type = type;
    }
}

export class CardItem {
    title: string;
    link: string;
    constructor(title: string, link: string) {
        this.title = title;
        this.link = link;
    }
}

type IProps = {
    page: PageItem
};
type IState = {};

class Page extends Component<IProps, IState>{
    static cardItems = [new CardItem("Student Center", "https://ebudd.io"), new CardItem("Classes", "https://ebudd.io"),
                        new CardItem("Search and Enroll", "https://ebudd.io"),new CardItem("Starfish", "https://ebudd.io"),
                        new CardItem("Piazza", "https://ebudd.io"),new CardItem("Canvas", "https://ebudd.io"),
                        new CardItem("Calculator", "https://ebudd.io"),new CardItem("Help", "https://ebudd.io")]
    render() {
        //const title = this.props.page.title;
        const type = this.props.page.type;

        return (
            <div className='page'>
                {this.renderPage(type)}
            </div>
        );
    }

    renderPage(type: PageType) {
        if (type === PageType.Tiles) {
            return this.renderTiles();
        } else if (type === PageType.RSS) {
            return this.renderRSS()
        }
    }

    renderTiles() {
        const cards = Page.cardItems.map((card: CardItem) => this.createTile(card))
        return(
            <CardColumns>
                {cards}
            </CardColumns>
        )
    }

    createTile(card: CardItem) {
        return (
            <div>
                <Tile card={card} key={card.title} />
            </div>
        )
    }

    renderRSS() {
        return(
            <h2>RSS</h2>
        )
    }
}

export default Page;