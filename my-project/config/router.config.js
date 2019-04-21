export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/news/manage', authority: ['admin', 'user'] },
      {
        path: '/news',
        name: 'news',
        icon: 'profile',
        routes: [
          {
            path: '/news/manage',
            name: 'manage',
            component: './News/News',
          },
          {
            path: '/news/add',
            name: 'add',
            component: './News/NewsAdd',
          },
        ],
      },
      {
        path: '/category',
        name: 'category',
        icon: 'table',
        component: './Category/Category',
      },
      {
        path: '/comment',
        name: 'comment',
        icon: 'form',
        component: './Comment/Comment',
      },
      {
        path: '/user',
        name: 'user',
        icon: 'user',
        component: './User/User',
      },
      {
        component: '404',
      },
    ],
  },
];
