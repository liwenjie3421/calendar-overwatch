import React from 'react';
import { Input, Button, Col, Row, DatePicker, message } from 'antd';
import axios from 'axios';
import {domain} from '../../config';

const { MonthPicker } = DatePicker;
const  { TextArea } = Input;
export default class Insert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: []
        };
    }

    componentDidMount() {
        
    }

    handleClick() {
        const {start: monthPicker, tutorInfo, input: info} = this.state;
        axios.post(`${domain}/calendarInfo`, {
            monthPicker,
            type: 'save',
            info,
            tutorInfo
        }).then(v=>{
            const {status, data} = v;
            if(status === 200 && data && data.content) {
                message.success('添加成功');
            } else {
                message.error(`失败： ${data.error}`);
            }
            console.log(v)
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

    handlePasteTutorInfo = (e) => {
        const dom = e.clipboardData.getData('text/html');
        const container = document.createElement('div');
        container.innerHTML = dom;
        let obj = {
            name: '',
            color: ''
        };
        const trs = Array.from(container.getElementsByTagName('tr'));
        let tutorInfo = '';
        if (!trs.length) {
            message.warning('请多选择该导师的排班以确定颜色，并确保第一列为导师姓名列');
            return;
        }
        for (let index = 0; index < trs.length; index++) {
            const nodes = trs[index].getElementsByTagName('td');
            const name = ((nodes[0].getElementsByTagName('font')[0] || {}).innerText || '').trim();
            obj.name = name;
            for (let index = 0; index < nodes.length; index++) {
                const node = nodes[index];
                if (node.style.backgroundColor) {
                    obj.color = node.style.backgroundColor;
                    break;
                }
            }   
            if(obj.name && obj.color) {
                tutorInfo += `${obj.name}:${obj.color}\n`;
            }
        }
        this.setState({
            tutorInfo
        });
    }

    handlePasteInfo = (e) => {
        const dom = e.clipboardData.getData('text/html');
        const container = document.createElement('div');
        container.innerHTML = dom;
        let input = [];
        const nodes = Array.from(container.getElementsByTagName('td'));
        for (let index = 0; index < nodes.length; index++) {
            const node = nodes[index];
            const obj = {};
            if (node.style.backgroundColor) {
                obj.color = node.style.backgroundColor;
            }
            obj.item = ((node.getElementsByTagName('font')[0] || {}).innerText || '').trim();
            input.push(obj);
        } 
        this.setState({
            input
        });
    }
    render() {
        return (
            <div>
                <Row>
                    <Col span={6}>
                        paste导师
                    </Col>
                    <Col span={18}>
                        <TextArea  rows={4} onPaste={this.handlePasteTutorInfo}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={6}>
                        paste排班
                    </Col>
                    <Col span={18}>
                        <TextArea  rows={4} onPaste={this.handlePasteInfo}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={6}>
                        导师名字以及颜色：
                    </Col>
                    <Col span={18}>
                        <TextArea type="text" rows="6" disabled value={this.state.tutorInfo}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={6}>
                        排班：
                    </Col>
                    <Col span={18}>
                        <TextArea type="text" disabled value={(()=>{
                            let r = '';
                            this.state.input.map(v => {
                                r += `${v.item}:${v.color}  `;
                            })
                            return r;
                        })()}/>
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
