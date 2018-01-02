import React from 'react';
import { DatePicker, Row, Col } from 'antd';

const { MonthPicker } = DatePicker;
export default class Serach extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    handleChangeMonth = (date, dateString) => {
        if(!date) {
            return;
        }
        const start = `${dateString}`;
        console.log(start);    
    }

    render() {
        return (
            <div>
                <Row>
                    <Col push={6}>
                        <MonthPicker onChange={this.handleChangeMonth}  format={'YYYY-MM-01'} />
                    </Col>
                </Row>
                <Row>
                    
                </Row>
            </div>
        );
    }
}
