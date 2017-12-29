import Insert from './pages/insert';
import Search from './pages/search';

export default [
    {
        path: '/insert',
        component: Insert,
        exact: true
    },
    {
        path: '/search',
        component: Search,
        exact: true
    }
];