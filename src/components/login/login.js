import React, { Component } from 'react';
import {Grid, Cell, Textfield} from 'react-mdl';
import {getAddress} from '../../redux/actions/address.action';
import {connect} from 'react-redux';
import './login.css';

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orderNumber: '',
            email: '',
            address: '',
            disabledButton: true
        };
    }

    checkOrder = (e) => {
        fetch("/data/data.json").then((response) => {
            return response.json();
        }).then((data) => {
            this.checkIsOrderExisting(data);
        });
    }

    checkIsOrderExisting = (json) => {
        if (json && json.data) {
            json.data.map(item => {
                if (item.orderNumber === this.state.orderNumber &&
                    item.email === this.state.email) {
                        this.setState({address: item.address});

                        this.props.getAddress(item.address);
                        this.props.history.push('delivery');
                    } 
                return false;
            })

            return !this.state.address && alert(this.props.translations.wrongEmail)
        }
    }

    setValue = (e, input) => {
        if (!e.target.parentElement.classList.contains('is-invalid')) {
            this.setState({[input]: e.target.value});    
        } else {
            this.setState({[input]: ''});
        }
    }

    onlyNumberPattern = (event) => {
        let key = event.keyCode || event.charCode;
        let charcodestring = String.fromCharCode(event.which);
        let maxlength = 15;
        let regex = new RegExp('^[0-9]+$');

        if (key === 8 || key === 46 || key === 13 || key === 37 || key === 39 || key === 9) {
            return true;
        }

        if (event.target.value.length > maxlength) {
            event.preventDefault();
            return false;
        }

        if (!regex.test(charcodestring)) {
            event.preventDefault();
            return false;
        }

        return true;
    }

    render() {
        return (
            <div>
                <Grid className="center-items grid-top">
                    <Cell col={4} offset={4}>
                        <img src={'/assets/zigzag.png'} alt={'zigzag'} className="logo" />
                        <div>
                            <Textfield
                                id="orderNumber"
                                onChange={(e) => this.setValue(e, 'orderNumber')}
                                pattern=".{0}|.{5,16}?"
                                error="Input more than 4 characters"
                                label={this.props.translations && this.props.translations.orderNumber ? 
                                    this.props.translations.orderNumber : ''}
                                style={{width: '200px'}}
                                onKeyPress={this.onlyNumberPattern}
                            />
                        </div>
                        <div>
                            <Textfield
                                id="email"
                                ref={(ref) => this.email = ref}
                                onChange={(e) => this.setValue(e, 'email')}
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                error="Input valid email address"
                                label={this.props.translations && this.props.translations.emailAddress ? 
                                    this.props.translations.emailAddress : ''}
                                style={{width: '200px'}}
                            />
                        </div>

                        <div className="button-wrapper">
                            <button className="button-green" type="submit" onClick={this.checkOrder} 
                                disabled={this.state.orderNumber.length === 0 || this.state.email.length === 0}>
                                    {this.props.translations.proceed}
                                </button>
                        </div>  
                    </Cell>
                </Grid>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getAddress: (item) => dispatch(getAddress(item))
});

const mapStateToProps = (state) => {
    return {
        translations: state.translateReducer.translations
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);