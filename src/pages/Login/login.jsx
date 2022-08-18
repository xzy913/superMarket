import React , { Component ,useState,setState} from 'react'
import {Route, Link, useRoutes } from 'react-router-dom'
import axios from 'axios';
import styles from './login.module.css'
import img from '../../2.png'
import { Form, Input, Button, Checkbox, message, Image } from 'antd';
import Home from '../Home/home'
import Routes from '../../routes'
import './index'
import HttpUtil from '../../utils/httpUtil';
import { render } from '@testing-library/react';

// import { Button, Checkbox, Form, Input } from 'antd';
// import React from 'react';
// const [values,setState] = useState()

export default function Login ()  {
  const onFinish = (values) => {
    console.log('Success:', values);
    const {username,password} = values
    // setState(values)
     HttpUtil.login({
      adminaccount: username,
      adminpwd: password
  }).then(
    (res)=>{
      console.log(res);
     window.localStorage.setItem('token',res.data.token)
      window.location.href = "/home";
  
    }
  )
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
 
  return (
    <div className={styles.body}>
      <img className={styles.img} src={img} alt="" />
    <div className={styles.outer1} id="outer1">
      <div className={styles.main1} id="main1">
        <div className={styles.top_title}>请使用你的账号密码登录系统</div>
      
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className={styles.all_input}>
      <Form.Item
        label=""
        name="username"
        rules={[
          {
            required: true,
            message: '请输入你的账号',
          },
        ]}
      >
        <Input placeholder='请输入账号' className={styles.input1} />
      </Form.Item>
      
      <Form.Item
        label=""
        name="password"
        rules={[
          {
            required: true,
            message: '请输入你的密码',
          },
        ]}
      >
        <Input.Password placeholder='请输入密码' className={styles.input2} />
      </Form.Item>
      </div>
      <div className={styles.re_password}>
      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <a>
        <Checkbox>记住密码</Checkbox>
        </a>
      </Form.Item>
      </div>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
         <div className={styles.all_btn}>
          {/* <Link to='/home'> */}
        <Button className={styles.btn1} type="primary" htmlType="submit">
          登录
        </Button>
        {/* </Link> */}
        <Link to='/register'>
        <Button className={styles.btn2} type="primary" htmlType="buttuon" >注册</Button>
        </Link>
        </div>
      </Form.Item>
    </Form>
    </div>
    </div>
    </div>
  );
};

