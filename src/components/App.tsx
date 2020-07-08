import React, { Component } from "react";
import DefaultAppBar from './Appbar'

type IProps = {};
type IState = {
    menu: string[]
    selected: string
};

class App extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        const options: string[] = ['Applications', 'Annoncements']
        this.state = {
            menu: options,
            selected: options[0]
        }
    }

    handleClick(item: string) {
        this.setState({
            selected: item
        })
    }

    render() {
        return(
            <div className='app'>
                <DefaultAppBar 
                    menu={this.state.menu}
                    onClick= {(i: string) => this.handleClick(i) }
                />
                <div className='page'>
                    <h1>{this.state.selected}</h1>
                </div>
            </div>
        );
    }
}


export default App