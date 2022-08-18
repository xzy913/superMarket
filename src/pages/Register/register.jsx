import img from '../../2.png'
import styles from './register.module.css'
import { Link } from 'react-router-dom';
import HttpUtil from '../../utils/httpUtil';
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd';
import React, {Component, useState } from 'react';
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


const Register = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const { nickname, account, password } = values
    console.log(nickname, account, password);
   HttpUtil.register({
    name: nickname,
    adminaccount: account,
    adminpwd: password
  }).then(() =>
     window.location.href = '/login'
    )
  };
  
    return (
      <div className={styles.body}>
        <img className={styles.img} src={img} alt="" />
        <div className={styles.outer2} id="outer2">
          <div className={styles.main2} id="mian2">
            <div className={styles.top_title2}>请新建您的账号注册系统</div>
            <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
    >

              <div className={styles.All_input}>
                <Form.Item
                  name="nickname"
                  //   label="姓名"
                  tooltip="What do you want others to call you?"
                  rules={[
                    {
                      required: true,
                      message: '请输入你的姓名!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input placeholder='请输入你的姓名' className={styles.input_one} />
                </Form.Item>
                <Form.Item
                  name="account"
                  //   label="账号"
                  rules={[
                    {
                      //   type: 'email',
                      message: 'The input is not valid Account!',
                    },
                    {
                      required: true,
                      message: '请输入你的账号!',
                    },
                  ]}
                >
                  {/* <img className={img} src={img} alt="" /> */}
                  <Input placeholder='请输入你的账号' className={styles.input_two} />

                </Form.Item>

                <Form.Item
                  name="password"
                  //   label="密码"
                  rules={[
                    {
                      required: true,
                      message: '请输入你的密码!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder='请输入你的密码' className={styles.input_three} />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  //   label="确认密码"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: '请确认你的密码!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(new Error('你输入的两次密码不一致!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder='请确认你的密码' className={styles.input_four} />
                </Form.Item>
              </div>

              <Form.Item {...tailFormItemLayout}>
                <div className={styles.All_btn}>
                  <Button className={styles.btn_one} type="primary" htmlType="submit">
                    注册
                  </Button>
                  <Link to='/login'>
                    <Button className={styles.btn_two} type="primary" >返回</Button>
                  </Link>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  };


export default Register;
