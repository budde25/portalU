import React, { Component } from "react";

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

type IProps = {
    page: PageItem
};
type IState = {};

class Page extends Component<IProps, IState>{
    render() {
        const title = this.props.page.title;
        const type = this.props.page.type;

        return (
            <div className='Page'>
                <h1>{title}</h1>
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
        return(
            <h2>Tiles</h2>
        )
    }

    renderRSS() {
        return(
            <h2>RSS</h2>
        )
    }
}

export default Page;