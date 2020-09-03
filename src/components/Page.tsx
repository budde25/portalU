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
type IState = {
    itemList: any[],
    count: number
};

class Page extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = ({
            itemList: [],
            count: 0
        })

    }

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
        const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
        let parser = new Parser();
        let itemList: any[] = [];

        (async () => {
            let feed = await parser.parseURL(CORS_PROXY + 'https://www.reddit.com/.rss');
            console.log(feed.title);
            feed.items.forEach((item: any) => {
                if (this.state.count < 25) {
                    this.setState({
                        itemList: itemList.concat(item),
                        count: this.state.count + 1
                    })
                }
            });
        })();
        const cards = itemList.map((item: any) => this.createTile(item))
        return(
            <div>
                {cards}
            </div>
        )
    }

    createRss(item: any) {
        console.log(item.title)
        return (
            <div key={item.title}>
                <Rss title={item.title} />
            </div>
        )
    }
}

export default Page;