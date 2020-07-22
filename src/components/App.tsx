import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Page, { PageType, PageItem } from "./Page";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown'
import NavItem from 'react-bootstrap/NavItem'
import NavLink from 'react-bootstrap/NavLink'
import FormControl from 'react-bootstrap/FormControl';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import '../styles/App.css'

type IProps = {};
type IState = {
    menu: PageItem[],
    isAuthenticated: boolean,
    selectedPage: PageItem,
    searchText: string,
};

export default class App extends Component<IProps, IState> {
    static options = [new PageItem('Apps', PageType.Tiles), new PageItem('Announcements', PageType.RSS)]

    constructor(props: IProps) {
        super(props)
        this.state = {
            menu: App.options,
            isAuthenticated: true,
            selectedPage: App.options[0],
            searchText: '',
        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
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
                    <Page {...props} page={this.state.selectedPage} searchText={this.state.searchText} />
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
                        </Nav>
                        <Form inline>
                            <InputGroup>
                            <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                                            <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                                        </svg>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl 
                                    type="text" 
                                    placeholder="Search" 
                                    className="mr-sm-2" 
                                    value={this.state.searchText} 
                                    onChange={this.handleSearchChange} 
                                />
                            </InputGroup>
                        </Form>
                        <Nav>
                            <Dropdown as={NavItem} alignRight={true}>
                                <Dropdown.Toggle as={NavLink}>Settings</Dropdown.Toggle>
                                <Dropdown.Menu>
                                        <Dropdown.Item>
                                            <Link className='text-link' to='/settings'>Settings</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Link className='text-link' to='/admin-settings'>Admin Settings</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Divider/>
                                        <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }

    handleSearchChange(event: any) {
        this.setState({searchText: event?.target?.value})
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