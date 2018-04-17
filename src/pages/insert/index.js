import React from 'react';
import { Input, Button, Col, Row, DatePicker, message, Select } from 'antd';
import axios from 'axios';
import moment from 'moment'
import {domain} from '../../config';

const { MonthPicker } = DatePicker;
const  { TextArea } = Input;
export default class Insert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: [],
            tutorInfo: {}
        };
    }

    componentDidMount() {
        
    }

    handleClick() {
        let {start: date, tutorInfo, input: info} = this.state;
        if (!(date && tutorInfo && info)) {
            message.warning('有值为空');
            return;
        }
        const days = moment(date).daysInMonth();
        if (days !== info.length) {
            message.warning('日期不符');
            return;
        }

        info = info.map((item, index) => {
            item.teacher = tutorInfo[item.color] || '未知';
            item.date = moment(date.replace('-01', `-${index+1}`)).format('YYYY-MM-DD');
            return item;
        });
        axios.post(`${domain}/api/calendarInfo`, {
            batch: true,
            batchData: info
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

    handleChangeTutorInfo = (infos) => {
        const tutorInfo = {};
        infos.map(item=>{
            const itemObj = item.split(':');
            tutorInfo[itemObj[0]] = itemObj[1];
        })
        console.log(tutorInfo);
        this.setState({
            tutorInfo
        });
    }

    rgb216(rgb) {
        const colors = rgb.match(/rgb\((.*)\)/)[1].split(',');
        return `#${colors.map(color => {
            const r = Number(color).toString(16);
            return (r.length <= 1) ? ('0' + r) : r;
        }).join('')}`;
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
                obj.color = this.rgb216(node.style.backgroundColor);
            }
            obj.event = ((node.getElementsByTagName('font')[0] || {}).innerText || '').trim();
            input.push(obj);
        } 
        console.log(input);
        this.setState({
            input
        });
    }
    render() {
        return (
            <div>
                <Row>
                    <Col span={6}>
                        导师以及对应颜色(:分割，比如： #dddddd:赵晓波)
                    </Col>
                    <Col span={18}>
                    <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        onChange={this.handleChangeTutorInfo}
                        tokenSeparators={[',']}
                    />
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
                        {
                            Object.keys(this.state.tutorInfo).map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div style={{display: 'inline-block'}}>{this.state.tutorInfo[item]}</div>
                                        <span style={{width: 15, height: 15, display: 'inline-block', backgroundColor: item}} />
                                    </div>
                                )
                            })
                        }
                        <div></div>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={6}>
                        排班：
                    </Col>
                    <Col span={18}>
                        {
                            this.state.input.map((item, index) => {
                                return <span style={{display:'inline-block', border: '1px solid #ccc', backgroundColor: item.color}} key={index}>{item.event}:{item.color}</span>
                            })
                        }
                        {/* <TextArea type="text" disabled value={(()=>{
                            let r = '';
                            this.state.input.map(v => {
                                r += `${v.item}:${v.color}  `;
                            })
                            return r;
                        })()}/> */}
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={6}>
                        选择日期：
                    </Col>
                    <Col push={18}>
                        <MonthPicker onChange={(date, dateString)=>{this.handleChangeMonth(date, dateString)}}  format={'YYYY-MM-01'} />
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Button onClick={()=>{this.handleClick()}}>submit</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
