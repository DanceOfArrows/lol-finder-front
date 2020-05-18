import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Kindred_sf_pixel from '../assets/custom/Kindred_sf_pixel.png';
import { changeRegion } from '../redux/search';

import './styles/Search.css'


class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            summonerName: '',
            region: 'NA1',
        }

        this.changeRegion = this.changeRegion.bind(this);
        this.inputForm = null;
        this.updateSummonerName = this.updateProperty('summonerName');
        this.updateRegion = this.updateProperty('region');
    }

    componentDidMount() {
        const inputForm = document.querySelector('.search-input');
        if (inputForm) this.inputForm = inputForm;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.summonerName === this.state.summonerName ? false : true;
    }

    changeRegion(e) {
        this.inputForm.focus();
        this.updateRegion(e);
        this.props.changeRegion(e.target.value);
    }

    updateProperty = property => e => {
        this.setState({
            [property]: e.target.value
        });
    }

    render() {
        return (
            <div className='body-content'>
                <div className='search-container'>
                    <img src={Kindred_sf_pixel} className='search-logo-kindred' alt='hi' />
                    <form className='search-form-container'>
                        <div className="search-dropdown">
                            <select defaultValue={'NA1'}
                                onChange={this.changeRegion}
                            >
                                <option value='BR1'>BR1</option>
                                <option value='EUN1'>EUN1</option>
                                <option value='EUW1'>EUW1</option>
                                <option value='JP1'>JP1</option>
                                <option value='KR'>KR</option>
                                <option value='LA1'>LA1</option>
                                <option value='LA2'>LA2</option>
                                <option value='NA1'>NA1</option>
                                <option value='OC1'>OC1</option>
                                <option value='TR1'>TR1</option>
                                <option value='RU'>RU</option>
                            </select>
                            <div className="search-dropdown-arrow" />
                        </div>
                        <input
                            className='search-input'
                            type="text"
                            placeholder="Summoner name"
                            onChange={this.updateSummonerName}
                        />
                        <NavLink
                            exact to={this.state.summonerName ? `/summoner/${this.state.summonerName}` : '/search'}
                            className='search-btn-navlink'
                        >
                            <button className='search-btn' type="submit">
                                Go
                            </button>
                        </NavLink>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        region: state.search.region,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeRegion: (...args) => dispatch(changeRegion(...args)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    Search
);
