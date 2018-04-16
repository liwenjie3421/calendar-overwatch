import React from 'react';
import { Calendar } from 'antd';
import axios from 'axios';
import moment from 'moment';
import {domain} from '../../config';

export default class Serach extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
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
            if (status === 200 && data && data.content) {
                const {info: daysArr, tutorMap} = data.content;
                const daysNum = date.daysInMonth();
                this.setState({
                    tutorMap,
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

        this.getData(date);
    }

    dateCellRender = (value) => {
        if(value.month() === this.state.month) {
            const obj = this.state.daysArr[value.date()-1];
            const {color, item} = obj;
            return (
                <div style={{
                    background: `#${color}`,
                    width: '80%',
                    height: '80%'
                }}>
                    {item}
                </div>
            );
        }
    }

    render() {
        const {tutorMap} = this.state;
        const dataSource = [];
        for(let color in tutorMap) {
            const title = tutorMap[color];
            dataSource.push({
                title,
                color
            })
        }
        return (
            <div>
                <ul>
                    {
                        dataSource.map(data => <li key={data.title} style={{
                            background: `#${data.color}`,
                            listStyle: 'none'
                        }}>{data.title}</li>)
                    }
                </ul>
                <Calendar
                    onSelect={this.onSelect}
                    onPanelChange={this.onPanelChange}
                    onSelect={this.onPanelChange}
                    dateCellRender={this.dateCellRender} />
            </div>
        );
    }
}
