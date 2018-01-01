import Insert from './pages/insert';
import Search from './pages/search';

export default [
    {
        path: '/insert',
        component: Insert,
        exact: true
    },
    {
        path: '/',
        component: Search,
        exact: true
    }
];