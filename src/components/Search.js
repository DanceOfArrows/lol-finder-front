import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import BGSlider from './BGSlider';
import Kindred_sf_pixel from '../assets/custom/Kindred_sf_pixel.png';
import { changeRegion, submitSearch } from '../redux/search';

import './styles/Search.css'


class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            summonerName: '',
            region: 'NA1',
            searchSubmitted: false,
        }

        this.changeRegion = this.changeRegion.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.inputForm = null;
        this.updateSummonerName = this.updateProperty('summonerName');
        this.updateRegion = this.updateProperty('region');
    }

    componentDidMount() {
        const inputForm = document.querySelector('.search-input');
        if (inputForm) this.inputForm = inputForm;
        this.props.changeRegion(this.state.region);
    }

    changeRegion(e) {
        this.inputForm.focus();
        this.updateRegion(e);
        this.props.changeRegion(e.target.value);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.submitSearch()
    }

    updateProperty = property => e => {
        this.setState({
            [property]: e.target.value
        });
    }

    render() {
        const encodedName = encodeURIComponent(this.state.summonerName);

        if (this.props.searchSubmitted === true && this.state.summonerName) {
            return <Redirect to={`/summoner/${encodedName}`} />
        }

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
                        <button className='search-btn' type="submit" onClick={this.handleSubmit}>Go</button>
                    </form>
                </div>
                <BGSlider />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        region: state.search.region,
        searchSubmitted: state.search.searchSubmitted,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeRegion: (...args) => dispatch(changeRegion(...args)),
        submitSearch: () => dispatch(submitSearch()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    Search
);
