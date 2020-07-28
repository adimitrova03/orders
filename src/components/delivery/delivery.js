import React, { Component } from 'react';
import './delivery.css';
import {Grid, Cell, DataTable, TableHeader, Checkbox} from 'react-mdl';
import {connect} from 'react-redux';
import ReactMapGL from 'react-map-gl';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ExampleCustomTimeInput from './time'

class DeliveryComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewport: {
                width: 400,
                height: 400,
                latitude: 37.7577,
                longitude: -122.4376,
                zoom: 8,
                mapboxApiAccessToken: "pk.eyJ1IjoiYWxleC0xMzkiLCJhIjoiY2tkNHl2emYyMG1sMDJ4b2NoODJieW9sZiJ9.6sRiF8vW8x6CWsNfsVRQgQ"
            },
            apiKey: '428FCF28-9C5E-E882-FFC8-F579843307C4',
            tableData: [],
            nonWorkingDays: [],
            printerRequired: false,
            paidReturn: false,
            showResults: []
        }
    }

    componentWillMount() {
        fetch("/data/carrier.json").then((response) => {
            return response.json();
        }).then((data) => {
            if (data) {
                this.setState({tableData: data, showResults: data});
            }
        });
    }

    componentDidMount() {
        this.excludeDates();
    }

    setStartDate = (e) => {

    }

    excludeDates() {
        fetch("https://api.workingdays.org/1.2/api.php?key=" + this.state.apiKey + "&country_code=FR&command=list_non_working_days&start_date=2020-01-01&end_date=2020-12-31").then((response) => {
            return response.json();
        }).then((data) => {
            if (data) {
                this.setState({nonWorkingDays: data.result.non_working_days});
            }
        });
    }
    
    refreshTableData(target) {
        this.setState({[target]: !this.state[target]},
            () => {
                let filteredData = [] 

                if (target === 'printerRequired') {
                    this.setState({paidReturn: false})
                    if (this.state.printerRequired === true) {
                        filteredData = this.state.showResults.filter(item => item.requiredPrinter === "yes")
                    } else {
                        filteredData = this.state.showResults;
                    }

                } else if (target === 'paidReturn') {
                    this.setState({printerRequired: false})

                    if (this.state.paidReturn === true) {
                        filteredData = this.state.showResults.filter(item => item.price === "0")
                    } else {
                        filteredData = this.state.showResults;
                    }
                }

                this.setState({tableData: filteredData})
            })
    }

    render() {
        return (
            <div>
                <Grid className="grid-top">
                    <Cell col={8} offset={2}>
                        <img src={'/assets/zigzag.png'} alt={'zigzag'} className="logo" />
                        <p className="center-items">{this.props.translations.returnMethod}</p>
                        <input
                            className="address-input"
                            type="text"
                            placeholder="Address"
                            onChange={(item) => console.log(item)}
                            value={this.props.address ? this.props.address : ''}
                        />
                    </Cell>
                </Grid>
                <Grid>
                    <Cell col={6} offset={2}>
                        <p>{this.props.translations.dropOff}</p>
                        <ReactMapGL
                            {...this.state.viewport}
                            onViewportChange={(viewport) => this.setState({viewport})}
                        />
                    </Cell>
                    <Cell col={2}>
                        <p>{this.props.translations.filter}</p>
                        <Checkbox 
                            label={this.props.translations.printerRequired}
                            onChange={() => this.refreshTableData('printerRequired')}    
                            checked={this.state.printerRequired} 
                        />
                        <Checkbox 
                            label={this.props.translations.paidReturn}
                            onChange={() => this.refreshTableData('paidReturn')}
                            checked={this.state.paidReturn}
                        />  
                    </Cell>
                </Grid>
                <Grid>
                    <Cell col={12}>
                        {this.state.tableData && <DataTable
                            selectable
                            shadow={0}
                            rowKeyColumn="id"
                            rows={
                                this.state.tableData.map(row => {
                                        return {
                                            id: row.id, 
                                            collection: <img src={'/assets/' + row.collection + '.png'} 
                                                alt={row.collection} className="table-image" />, 
                                            method: row.serviceName, 
                                            printerRequired: row.requiredPrinter,
                                            price: row.price,
                                            pickupSlot: <DatePicker
                                                selected={new Date()}
                                                onChange={date => this.setStartDate(date)}
                                                excludeDates={[new Date(), this.state.nonWorkingDays]}
                                                showTimeInput
                                                customTimeInput={<ExampleCustomTimeInput />}
                                            />
                                        }
                                })
                            }
                        >
                            <TableHeader name="collection" tooltip={this.props.translations.collection}>
                                {this.props.translations.collection}
                            </TableHeader>
                            <TableHeader name="method" tooltip={this.props.translations.method}>
                                {this.props.translations.method}
                            </TableHeader>
                            <TableHeader name="printerRequired" tooltip={this.props.translations.printerRequired}>
                                {this.props.translations.printerRequired}
                            </TableHeader>
                            <TableHeader name="price" 
                                tooltip={this.props.translations.price}>
                                    {this.props.translations.price}
                            </TableHeader>
                            <TableHeader name="pickupSlot" tooltip={this.props.translations.pickupSlot}>
                                {this.props.translations.pickupSlot}
                            </TableHeader>
                        </DataTable>}
                    </Cell>
                </Grid>
                <Grid>
                    <Cell col={12} className="center-items">
                        <div className="button-wrapper">
                            <button className="button-green" type="submit">{this.props.translations.proceed}</button>
                        </div>  
                    </Cell>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        translations: state.translateReducer.translations,
        address: state.addressReducer.address
    }
}

export default connect(mapStateToProps, null)(DeliveryComponent);