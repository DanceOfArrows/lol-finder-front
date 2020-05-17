import React from 'react';
import { connect } from 'react-redux';
import { getSummonerHistory } from '../redux/summonerInfo';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  border-color: #C44017;
`;

class SummonerInfo extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        this.props.getSummonerHistory(window.location.pathname.split("/").pop(), this.props.region);
    }

    render() {
        return (
            <div className='body-content'>
                {this.props.loading ? (
                    <div className="rotation-loading">
                        <ClipLoader
                            css={override}
                            size={150}
                            color={"#123abc"}
                            loading={this.props.loading}
                        />
                    </div>
                ) :
                    (
                        <h1>Hello world from SummonerInfo!</h1>
                    )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.app.loading,
        matchHistory: state.summonerInfo.matchHistory,
        region: state.search.region,
        summonerName: state.summonerInfo.summonerName,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSummonerHistory: (...args) => dispatch(getSummonerHistory(...args)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    SummonerInfo
);
