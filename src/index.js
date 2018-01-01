import React from 'react';
import ReactDom from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'antd/dist/antd.css';

import Layout from './pages/layout';
import routes from './routes';

ReactDom.render(
    <LocaleProvider locale={zhCN}>
        <Router>
            <Layout>
                {
                    routes.map(v => <Route key={v.path} path={v.path} exact component={v.component}/>)
                }
            </Layout>
        </Router>
    </LocaleProvider>
    , document.getElementById("app"));