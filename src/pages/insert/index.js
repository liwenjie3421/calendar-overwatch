import React from 'react';
import { Input, Button, Col, Row, DatePicker } from 'antd';
import axios from 'axios';

const { MonthPicker } = DatePicker;

export default class Insert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleClick() {
        axios.post('http://localhost:7001/calendarInfo', {
            monthPicker: this.state.start,
            type: 'save',
            info: this.state.input
        })
    }

    handleChangeMonth(date, dateString) {
        if(!date) {
            return;
        }
        const start = `${dateString}`;
        this.setState({
            start
        });
    }
    handleChange(e) {
        this.setState({
            input: e.target.value
        });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Input onChange={(e)=>{this.handleChange(e)}}/>            
                    </Col>
                </Row>
                <Row>
                    <Col push={6}>
                        <MonthPicker onChange={(date, dateString)=>{this.handleChangeMonth(date, dateString)}}  format={'YYYY-MM-01'} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={()=>{this.handleClick()}}>submit</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
