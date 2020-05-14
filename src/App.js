import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import About from './components/About';
import Home from './components/Home';
import FreeRotation from './components/FreeRotation';
import Search from './components/Search';

import Kindred_pixel from './assets/custom/Kindred_pixel.png';
import Kindred_sf_pixel from './assets/custom/Kindred_sf_pixel.png';

class App extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    updateNav() {
        const nav = document.getElementById('mobile-nav');
        const body = document.getElementById('body');
        const navbar = document.querySelector('.mobile-nav-container');
        const footer = document.getElementById('footer-container');

        if (nav.offsetWidth === 0) { // Show nav
            nav.style.width = '50%';
            body.style.marginRight = '50%';
            navbar.style.marginRight = '50%';
            footer.style.marginRight = '50%';
            return;
        } else { // Hide Nav
            nav.style.width = '0';
            body.style.marginRight = '0';
            navbar.style.marginRight = '0';
            footer.style.marginRight = '0';
            return;
        }
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            const nav = document.getElementById('mobile-nav');
            const body = document.getElementById('body');
            const navbar = document.querySelector('.mobile-nav-container');
            const footer = document.getElementById('footer-container');

            if (window.innerWidth > 961) {
                nav.style.width = '0';
                body.style.marginRight = '0';
                navbar.style.marginRight = '0';
                footer.style.marginRight = '0';
                return;
            }
        })
    }

    render() {
        return (
            <>
                <div className='navbar-container'>
                    <nav className='navbar'>
                        <NavLink exact to='/'
                            className='nav-link-home'
                            activeClassName='nav-link-active'>
                            LoL Finder
                        </NavLink>
                        <div className='nav-link-seperator'></div>
                        <img src={Kindred_sf_pixel} className='logo-kindred' alt='hi' />
                        <NavLink exact to='/rotation'
                            className='nav-link-rotation'
                            activeClassName='nav-link-active'>
                            Rotation
                        </NavLink>
                        <NavLink exact to='/search'
                            className='nav-link-search'
                            activeClassName='nav-link-active'>
                            Search
                        </NavLink>
                        <NavLink exact to='/about'
                            className='nav-link-about'
                            activeClassName='nav-link-active'>
                            About
                        </NavLink>
                    </nav>
                </div>
                <div className='mobile-nav-container'>
                    <nav id='mobile-nav'>
                        <img src={Kindred_pixel} className='logo-mobile-kindred' alt='hi' />
                        <NavLink exact to='/'
                            className='nav-link-home'
                            activeClassName='nav-link-active'>
                            Home
                        </NavLink>
                        <NavLink exact to='/rotation'
                            className='nav-link-rotation'
                            activeClassName='nav-link-active'>
                            Rotation
                        </NavLink>
                        <NavLink exact to='/search'
                            className='nav-link-search'
                            activeClassName='nav-link-active'>
                            Search
                                    </NavLink>
                        <NavLink exact to='/about'
                            className='nav-link-about'
                            activeClassName='nav-link-active'>
                            About
                        </NavLink>
                    </nav>
                    <div className='mobile-nav-bar'>
                        <NavLink exact to='/' className='mobile-button-home'>LoL Finder</NavLink>
                        <button className='mobile-button-nav' onClick={this.updateNav} onBlur={this.updateNav}>
                            <i className='fa fa-bars'></i>
                        </button>
                    </div>
                </div>
                <div id='body'>
                    <Switch>
                        <Route path='/rotation' component={FreeRotation} />
                        <Route path='/search' component={Search} />
                        <Route path='/about' component={About} />
                        <Route exact path='/' component={Home} />
                        <Route render={() => <h1>404: Page not found</h1>} />
                    </Switch>
                </div>
                <div id='footer-container'>
                    <div className='footer-text'>
                        LoL Finder isn't endorsed by Riot Games and doesn't reflect the views or opinions of
                        Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot
                        Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
                    </div>
                </div>
            </>
        );
    }
}



export default App;
