import {message, Input, Space, PageHeader, Button } from 'antd'
import React, { Component } from 'react'
import httpUtil from '../../../../utils/httpUtil';

export default class Changepwd extends Component {
    state={
        value:''
    }
    
    getValue=(e)=>{
        const value = e.target.value
        this.setState({value:value})
    }
    finishChange = (id) => {
        httpUtil.updatePwd(
            {
                "_id": id,
                "modifiedpassword": this.state.value
            }
        ).then(
            (res) => {
                message.success('密码修改成功');
                window.location.href = '/home/uim'
            }
        )
    }
    render() {
        const record = this.props.record
        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => {
                        const isChangepwd = this.props.isChangepwd
                        this.props.goback(!isChangepwd)
                    }}
                    subTitle="用户信息管理/修改用户密码"
                    style={{ paddingLeft: 10, backgroundColor: 'white' }}
                />
                用户姓名：{record.name}<br />
                用户账号：{record.useraccount}<br />
                原密码：{record.userpwd}<br />
                新密码：
                <Space direction="vertical">
                    <Input.Password onChange={this.getValue} placeholder="输入新密码" />
                    <Button onClick={() => this.finishChange(record._id)} type='primary'>提交修改</Button>
                    {/* <Input.Password
                        placeholder="input password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    /> */}
                </Space>
            </div>
        )
    }
}
