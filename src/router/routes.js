
const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'loginDefault', component: () => import('pages/Login.vue') },
      { path: 'login', name: 'login', component: () => import('pages/Login.vue') },
      { path: 'register', name: 'register', component: () => import('pages/Register.vue') },
      { path: 'email-confirmation', name: 'email-confirmation', component: () => import('pages/EmailConfirmation.vue') },
      { path: 'forgot-password', name: 'forgot-password', component: () => import('pages/ForgotPassword.vue') },
      { path: 'reset-password', name: 'reset-password', component: () => import('pages/ResetPassword.vue') },
      { path: 'product-public/:id', name: 'product-public', component: () => import('pages/product/Public.vue') },
      { path: 'HistoricoCompras/:idUsuario', name: 'HistoricoCompras', component: () => import('pages/HistoricoCompras.vue') }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'me/:id?', name: 'me', component: () => import('pages/Me.vue'), meta: { requiresAuth: true } },
      { path: 'category', name: 'category', component: () => import('pages/category/List.vue'), meta: { requiresAuth: true } },
      { path: 'form-category/:id?', name: 'form-category', component: () => import('pages/category/Form.vue'), meta: { requiresAuth: true } },
      { path: 'product', name: 'product', component: () => import('pages/product/List.vue'), meta: { requiresAuth: true } },
      { path: 'pedidos', name: 'pedidos', component: () => import('pages/Pedidos.vue'), meta: { requiresAuth: true } },
      { path: 'form-product/:id?', name: 'form-product', component: () => import('pages/product/Form.vue'), meta: { requiresAuth: true } }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
