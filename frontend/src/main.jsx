import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import {  createBrowserRouter, RouterProvider,createHashRouter } from "react-router-dom";
import Contextprovider from "./Components/context/Contextprovider";
import Signup from './Components/signup_signin/SignUp';
import Sign_in from './Components/signup_signin/Sign_in';
import Cart from './Components/cart/Cart';
import Buynow from './Components/buynow/Buynow';
import Maincomp from './Components/home/Maincomp';
import authStore from './Components/RTK_Setup/store';
import MobileComponentPage from './Components/compos/MobileComponentPage';
import Checkout from './Components/checkout/Checkout';
import ElectronicComponentPage from './Components/compos/ElectronicComponentPage';
import FashionComponentPage from './Components/compos/FashionComponentPage';
import BestSellerComponentPage from './Components/compos/BestSellerComponentPage';
import TodaysDealComponentPage from './Components/compos/TodaysDealComponentPage';
const container = document.getElementById('root');
const root = createRoot(container); 


const router=createHashRouter(
  [{
    path:'/',
    element:<App />,
    children:[
      {
          path:"",
          element:<Maincomp />
      },

      {
        path:"signup",
        element:<Signup/>
      },
    {
        path:"login",
        element:<Sign_in/>
    },
    {
        path:"getproductsone/:id",
        element:<Cart/>
    },
    {
        path:"buynow",
        element:<Buynow/>
    },
    {
        path:"getMobileData",
        element:<MobileComponentPage/>
    },
    {
        path:"getElectronicsData",
        element:<ElectronicComponentPage/>
    },
    {
        path:"getFashionData",
        element:<FashionComponentPage />
    },
    {
      path:"getBestSellerData",
      element:<BestSellerComponentPage />
    },
    {
      path:"getTodaysDealData",
      element:<TodaysDealComponentPage />
    },
    {
      path:"/productCheckout/:id",
      element:<Checkout/>
    }
    ]
  }]
)






root.render(
  <Contextprovider>
    <Provider store={authStore}>
    {/* <Provider store={store}> */}
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    {/* </Provider> */}
    </Provider>
  </Contextprovider>
);
