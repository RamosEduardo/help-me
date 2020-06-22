const routes = [
  {
    path: '/disconnected',
    component: () => import('layouts/NoSessionLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/Disconnected/Login.vue') },
      { path: 'create', component: () => import('pages/Disconnected/CreateUser.vue') },
    ],
  },

  {
    path: '/connected',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Connected/Home.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
