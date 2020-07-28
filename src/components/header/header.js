import React, { Component } from 'react';
import {Header} from 'react-mdl';
import {getTranslatedKeys} from '../../redux/actions/translate.action';
import {connect} from 'react-redux';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedLanguage: 'en',
            languages: {
                'en': 'English', 
                'bg': 'Bulgarian'
            }
        };
    }

    componentDidMount() {
        this.translate();
    }

    translate() {
        fetch('/data/' + this.state.selectedLanguage + '-translate.json').then((response) => {
            return response.json();
        }).then((json) => {
            if (json) {
                this.props.getTranslatedKeys(json);
            }
        });
    }

    handleChange = (e) => {
        this.setState({
            selectedLanguage: e.target.value
        }, () => {
            this.translate();
        });
    }

    render() {
        return ( 
            <Header>
                <select 
                    value={this.state.selectedLanguage} 
                    onChange={this.handleChange} 
                >
                    { Object.entries(this.state.languages).map(([key, value]) => {
                        return <option value={key} key={key}>{value}</option>
                    })}
                </select>
            </Header>
          );
    }
}

const mapDispatchToProps = dispatch => ({
    getTranslatedKeys: (item) => dispatch(getTranslatedKeys(item)) 
});

export default connect(null, mapDispatchToProps)(HeaderComponent);