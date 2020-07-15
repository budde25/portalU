import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Page, { PageType, PageItem } from "./Page";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import '../styles/App.css'

type IProps = {};
type IState = {
    menu: PageItem[],
    isAuthenticated: boolean,
    selectedPage: PageItem,
};

export default class App extends Component<IProps, IState> {
    static options = [new PageItem('Apps', PageType.Tiles), new PageItem('Announcements', PageType.RSS)]

    constructor(props: IProps) {
        super(props)
        this.state = {
            menu: App.options,
            isAuthenticated: true,
            selectedPage: App.options[0],
        }
    }

    render() {
        const titles: string[] = this.state.menu.map((page) => page.title);
        const routes = titles.map((title: string) => this.defineRoutes(title))
        return (
            <Router>
                {this.appbar()}
                <Switch>
                    <Route exact path='/'></Route>
                    <Route path='/settings' component={Settings}></Route>
                    <Route path='/admin-settings' component={AdminSettings}></Route>
                    {routes}
                    <Route component={NotFound} />
                </Switch>
            </Router>
        );
    }

    defineRoutes(title: string) {
        const name: string = '/' + title.toLowerCase()
        return (
            <Route key={title}
                path={name} 
                render={(props) => (
                    <Page {...props} page={this.state.selectedPage} />
                )}
            />
        );
    }


    /**
     * App bar code
     */
    appbar() {
        const home: string = '/' + this.state.selectedPage.title.toLowerCase()
        const listItems =  this.state.menu.map((page: PageItem) => this.listAppbarMenu(page))
        return (
            <div className="Appbar">
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand>
                        <Link className='text-link' to={home}>Portal-App</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {listItems}
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item>
                                    <Link className='text-link' to='/settings'>Settings</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link className='text-link' to='/admin-settings'>Admin Settings</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }

    /**
     * Appbar page helper
     * @param page the page to put on the menu
     */
    listAppbarMenu(page: PageItem) {
        const link: string = '/' + page.title.toLowerCase()
        return(
            <Nav.Link 
                key={page.title.toLowerCase()} 
                as={Link}
                className='text-link' 
                to={link} 
                onClick={() => this.setState({
                    selectedPage: page
                })
            }>{page.title}
            </Nav.Link>
        ); 
    }
}


/**
 * 404 page
 */
function NotFound() {
    return (
        <div className='not-found'>
            <h1>404</h1>
            <h2>Page Not Found</h2>
        </div>
    )
}


// Todo settings page
function Settings() {
    return (
        <h1>Settings</h1>
    );
}


// Todo admin page
function AdminSettings() {
    return (
        <h1>Admin Settings</h1>
    );
}