// 引入核心库
import React from 'react'
// 引入ReactDOM
import ReactDOM from 'react-dom'
// 引入App组件
import App from './App'
import { BrowserRouter } from 'react-router-dom';

//渲染App到页面 
ReactDOM.render(
  <BrowserRouter>
  <App/>
  </BrowserRouter>,
document.getElementById('root'));

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// // reportWebVitals();
