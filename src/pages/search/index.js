import React from 'react';
import { Calendar } from 'antd';
import axios from 'axios';
import moment from 'moment';
import {domain} from '../../config';

export default class Serach extends React.Component {
    constructor(props) {
        super(props);

        this.state = {daysArr:[]};
    }

    componentWillMount() {
        this.getData();
    }

    getData(date=moment()) {
        return axios.get(`${domain}/api/calendarInfo`, {
            params: {
                startDate : date.format('YYYY-MM-01'),
                endDate: date.format(`YYYY-MM-${date.daysInMonth()}`)
            }
        }).then(v => {
            const {status, data} = v;
            if (status === 200 && data && data.code === 1 && data.msg) {
                this.setState({
                    daysArr: data.msg,
                    month: date.month()
                });
            }
        })
    }

    onPanelChange = (date) => {
        if (!date) {
            return;
        }

        this.getData(date);
    }

    dateCellRender = (value) => {
        // console.log(value)
        const {month, daysArr} = this.state;
        if(value.month() === month) {
            for (let index = 0; index < daysArr.length; index++) {
                const dayData = daysArr[index];
                if(value.format('YYYY-MM-DD') === dayData.date) {
                    return (
                        <div style={{
                            background: dayData.color,
                            width: '80%',
                            height: '80%'
                        }}>
                            <div>
                                {dayData.event}班 
                            </div>
                            <div>
                                老师：{dayData.teacher}
                            </div>
                        </div>
                    );
                }
            }
        }
        return <div />
    }

    render() {
        return (
            <div>
                <Calendar
                    onSelect={this.onSelect}
                    onPanelChange={this.onPanelChange}
                    onSelect={this.onPanelChange}
                    dateCellRender={this.dateCellRender} />
            </div>
        );
    }
}
