import React from 'react';
import NavBar from './components/NavBar';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Home from './components/Home';
import Footer from './components/Footer';
import FreeRotation from './components/FreeRotation';
import Search from './components/Search';
import SummonerInfo from './components/SummonerInfo';
import BGSlider from './components/BGSlider';

class App extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <>
                <NavBar location={this.props.location} />
                <div id='body-container'>
                    <Route render={({ location }) => (
                        <TransitionGroup>
                            <CSSTransition
                                key={location.key}
                                timeout={300}
                                classNames='fade'
                            >
                                <div className='page-content'>
                                    <Switch location={location}>
                                        <Route exact path='/summoner/:summonerName' component={SummonerInfo} />
                                        <Route exact path='/rotation' component={FreeRotation} />
                                        <Route exact path='/search' component={Search} />
                                        <Route exact path='/' component={Home} />
                                        <Route render={() => <h1>404: Page not found</h1>} />
                                    </Switch>
                                    <Footer />
                                </div>
                            </CSSTransition>
                        </TransitionGroup>
                    )} />
                </div>
                <BGSlider />
            </>
        );
    }
}

export default App;
