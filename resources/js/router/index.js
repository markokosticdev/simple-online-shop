import { createRouter, createWebHistory } from 'vue-router'
import ProductList from "../pages/ProductList.vue";
import ProductDetails from "../pages/ProductDetails.vue";
import ProductAdd from "../pages/ProductAdd.vue";
import ProductUpdate from "../pages/ProductUpdate.vue";
import ProductLastViewed from "../pages/ProductLastViewed.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
          path: '/',
          name: 'ProductList',
          component: ProductList
      },
      {
          path: '/last-viewed',
          name: 'ProductLastViewed',
          component: ProductLastViewed
      },
      {
          path: '/product/details/:id',
          name: 'ProductDetails',
          component: ProductDetails
      },
      {
          path: '/product/add',
          name: 'ProductAdd',
          component: ProductAdd
      },
      {
          path: '/product/update/:id',
          name: 'ProductUpdate',
          component: ProductUpdate
      },
      {
          path: '/product/update/:id',
          name: 'ProductUpdate',
          component: ProductUpdate
      },
      {
          path: '/:catchAll(.*)',
          redirect: '/'
      }
  ]
})

export default router
