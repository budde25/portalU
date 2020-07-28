import React, { Component } from "react";
import Rss from './Rss'
import Tile from './Tile'
import '../styles/Page.css'
import data from '../config/cards.json'
let Parser = require('rss-parser');

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
    page: PageItem,
    searchText: string,
};
type IState = {};

class Page extends Component<IProps, IState>{
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
        const cardsInSearch = data.filter((card: CardItem) => {
            const title = card.title.toLowerCase()
            const search = this.props.searchText.toLowerCase()
            return title.includes(search)   
        })

        const cards = cardsInSearch.map((card: CardItem) => this.createTile(card))
        return(
            <ul className="list-group list-group-horizontal align-items-stretch flex-wrap">
                {cards}
            </ul>
        )
    }

    createTile(card: CardItem) {
        return (
            <div key={card.title}>
                <Tile card={card} key={card.title} />
            </div>
        )
    }

    renderRSS() {
        return(
            <div>
                {this.createRss}
            </div>
        )
    }

    createRss() {
        return (
            <div>
                <Rss url='fd'/>
            </div>
        )
    }
}

let parser = new Parser({
    headers: {'Access-Control-Allow-Origin': '*'}
});
(async () => {
 
    let feed = await parser.parseURL('https://www.reddit.com/.rss');
    console.log(feed.title);
   
    feed.items.forEach((item: any) => {
      console.log(item.title + ':' + item.link)
    });
   
  })();

export default Page;