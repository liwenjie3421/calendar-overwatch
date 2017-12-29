import React from 'react';
import ReactDom from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom';
import 'antd/dist/antd.css'; 

import Layout from './pages/layout';
import routes from './routes';

ReactDom.render(
    <Router>
        <Layout>
            {
                routes.map(v => <Route key={v.path} path={v.path} exact component={v.component}/>)
            }
        </Layout>
    </Router>, document.getElementById("app"));