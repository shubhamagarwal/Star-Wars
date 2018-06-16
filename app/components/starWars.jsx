import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../aasets/css/style.css';
import { getPlates }  from '../actions/login.js';
import { connect } from 'react-redux';

class StarWar extends Component {
    constructor() {
      super();
      this.state = {
        planets: [],
        maxPopulation: 200,
        searchKeyword: '',
        userName:'',
        planetsDetail:[],
        searchCount:0,
        errorMessage:'',
        timerSet: false
      }
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.userDetails.userData){
            this.setState({userName: nextProps.userDetails.userData.results[0].name, 
                planets: nextProps.userDetails.planetData.results,
            planetsDetail: nextProps.userDetails.planetData.results});
        }
    }

    componentDidMount(){
        this.props.dispatch(getPlates());
    }

    randomColor() {
        let hexColor = '#', counter = 0;
        let hexCode = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
        for (; counter < 6 ; counter++) {
            hexColor += hexCode[Math.round(Math.random()*15)];
        }

        return hexColor;
    }

    setTimer() {
        this.timer = setTimeout(() => {
            clearTimeout(this.timer);
            this.setState({
                searchCount: 0,
                errorMessage: '',
                timerSet: false,
            });
        }, 60000);
    }

    handleChangeOnSearch(e){
        console.log(this.state.searchCount);
        if(this.state.timerSet === false){
            this.state.timerSet = true;
            this.setTimer();
        }
        if(this.timer && this.state.searchCount < 16) {
            let filterbyName = this.state.planetsDetail.map(data => {
                let exist =  data.name.toLowerCase().includes(e.target.value.toLowerCase());
                data.isExist = exist;
                return data;
            }).filter(data => data.isExist == true);
            this.setState({planets: filterbyName,searchCount:this.state.searchCount+1});
        } else {
            this.setState({errorMessage: 'You can not make more than 15 search in a minute'});
        }
    }

    render(){
        return(
            <div className="col-md-12 col-sm-12 no-padding planet-component">
                <div className="input-group">
                    <div className="ais-search-box">
                        <input id="search-input" className="form-control ais-search-box--input" placeholder="Search for star war"  onChange={(e) => this.handleChangeOnSearch(e)}></input>
                    </div>
                       
                </div><br/>
                {this.state.planets.length ? (
                    <div className="col-md-12 col-sm-12">
                        <div className="error">{ this.state.errorMessage }</div>
                        <div className="loggedin-user">Username - {this.state.userName}</div>
                        <div className="col-md-12 col-sm-12 planets-container">
                            {
                                this.state.planets.map((data,index)=>{
                                    return(
                                        <div className="planets" key={index}
                                        style={{
                                            width: data.population === 'unknown' ? 200 : 200 + ( 350 * ( parseInt(data.population, 10)  / data.population ) ) + 'px',
                                            background: this.randomColor(),
                                        }}>
                                            <span className="planet-name">
                                                StarWar Name: { data.name }
                                            </span><br/>
                                            <span className="planet-population">
                                                StarWar Population: {data.population}
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                ): ''}
            </div>
        )
    }
}

function mapStateToProps(state) { 
    return {
        userDetails: state.login
    };
};

StarWar.propTypes = {
  userDetails: PropTypes.object
};
export default connect(mapStateToProps)(StarWar);