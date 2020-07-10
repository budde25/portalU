import React, { Component, Fragment } from "react";
import AppBar from './Appbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Page, { PageType, PageItem } from "./Page";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

type IProps = {};
type IState = {
    menu: PageItem[],
    isAuthenticated: boolean,
};

let page: PageItem = new PageItem('Apps', PageType.Tiles);

export default class App extends Component<IProps, IState> {
    static options = [new PageItem('Apps', PageType.Tiles), new PageItem('Announcements', PageType.RSS)]

    constructor(props: IProps) {
        super(props)
        this.state = {
            menu: App.options,
            isAuthenticated: true,
        }
    }

    render() {
        const titles: string[] = this.state.menu.map((page) => page.title);
        const routes = titles.map((title: string) => this.defineRoutes(title))
        return(
                <Router>
                    <AppBar menu={titles}></AppBar>
                    <Switch>
                        <Route exact path='/'></Route>
                        <Route path='/settings' component={Settings}></Route>
                        <Route path='/admin-settings' component={AdminSettings}></Route>
                        {routes}
                        <Route component={NotFound}/>
                    </Switch>
                </Router>
        );
    }

    defineRoutes(title: string) {
        const name: string = '/' + title.toLowerCase()
        return(
            <Route path={name} component={BlankPage} ></Route>
        );
    }
}

function BlankPage(){
    return (
        <Fragment>
            <Page page={page} />
        </Fragment>
    );
}

function NotFound(){
    return(
        <div className='not-found'>
            <h1>404</h1>
            <h2>Page Not Found</h2>
        </div>
    )
}

function Settings(){
    return(
        <h1>Settings</h1>
    );
}

function AdminSettings(){
    return(
        <h1>Admin Settings</h1>
    );
}