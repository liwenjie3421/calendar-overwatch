import React from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';
import './index.scss';

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="main">
                <div className="nav">
                    <Menu style={{height: '100%'}}>
                        <Menu.Item key="1">
                            <Link to="/">
                                <Icon type="calendar" />
                                search
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/insert">
                                <Icon type="mail" />
                                insert
                            </Link>
                        </Menu.Item>
                    </Menu>
                </div>
                <div className="container">
                    {this.props.children}
                </div>
                <p className="clearfix"></p>
            </div>
        );
    }
}
