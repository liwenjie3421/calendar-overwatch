import React from 'react';
import { Calendar, Alert } from 'antd';
import axios from 'axios';
import moment from 'moment';


export default class Serach extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {
        this.post();
    }

    post(date=moment()) {
        return axios.post('http://localhost:7001/calendarInfo', {
            monthPicker : date.format('YYYY-MM-01'),
            type: 'get'
        }).then(v => {
            const {status, data} = v;
            if (status === 200 && data && data.content) {
                const daysArr = data
                    .content
                    .split(',');
                const daysNum = date.daysInMonth();
                this.setState({
                    daysNum,
                    daysArr,
                    month: date.month()
                });
            }
        })
    }

    onPanelChange = (date) => {
        if (!date) {
            return;
        }

        this.post(date);
    }

    dateCellRender = (value) => {
        if(value.month() === this.state.month) {
            return this.state.daysArr[value.date()-1];
        }
    }

    render() {
        return (
            <div>
                {/* <Alert
                    message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`}/> */}
                <Calendar
                    onSelect={this.onSelect}
                    onPanelChange={this.onPanelChange}
                    onSelect={this.onPanelChange}
                    dateCellRender={this.dateCellRender} />
            </div>
        );
    }
}
