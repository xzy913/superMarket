import { Space, Table, Button, Layout ,Divider} from 'antd';
import HttpUtil from '../../../utils/httpUtil';
import React, { Component} from 'react';
import DescriptionWrapper from '../../../common/descriptionWrapper/descriptionWrapper';
import Changepwd from './changepwd/changepwd';
export default class Uim extends Component {
    state = {
        isChangepwd:false,
        users: [],
        current: 1,
        pageSize: 7,
        total: '',
        record:''
        

    }

    deleteUsers = (record) => {
        if (window.confirm('确定删除吗')) {
            HttpUtil.deleteUser({ _id: record._id }).then(
                (res) => {
                    const {current,pageSize,total} = this.state
                    // this.setState({ pagination:pagination})
                    // this.componentDidMount(pagination)
                    HttpUtil.getUsers(
                        {current,pageSize
                        }).then((res) => {
                        const { users } = res.data
                        // console.log(res);
                        this.setState({ current:current,pageSize:pageSize, users: users })
                    })
                    console.log(res);
                }
            )
        }
    }
    isChangepwdTrue=(record)=>{
        this.setState({isChangepwd:true,record:record})
    }
    goback=()=>{
        this.setState({
          isChangepwd: false
        })
      }

    componentDidMount() {
        const { current,pageSize } = this.state
        // console.log(Info);
        HttpUtil.getUsers({ 
            current:current,
            pageSize:pageSize
        }).then((res) => {
            const { total, users } = res.data
            console.log(res.data);
            this.setState({users: users, total: total })
        })

    }

    changeTable = (pagination) => {
        const { current, pageSize,total } = pagination
        this.setState({
               current: current, 
               pageSize:pageSize,
               total:total
        })
        this.componentDidMount()
    }

    render() {
        const columns = [
            {
                title: '账号',
                dataIndex: 'useraccount',
                key: 'useraccount',
            },
            {
                title: '密码',
                dataIndex: 'userpwd',
                key: 'userpwd',
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: (text) => <a>{text}</a>,
            },
            {
                title: '性别',
                dataIndex: 'gender',
                key: 'gender',
            },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '操作',
                key: 'action',
                render: (_, record) => (
                    <Space size="middle">
                        <Button
                            onClick={()=>this.isChangepwdTrue(record)}
                            type='primary'>
                            更改密码

                        </Button>
                        <Button
                            onClick={() => { this.deleteUsers(record) }}
                            danger
                            type="primary">删除用户</Button>

                    </Space>
                ),
            },
        ];
        const { users, current,pageSize,total,isChangepwd,record } = this.state
        const Id = users._id
        return (
            <div>
                <DescriptionWrapper title='用户列表' details='用户信息展示，可进行用户密码修改和删除用户操作' />
                <Divider style={{ margin: 0 }} />
                {/* <Content> */}
                <div>
                {isChangepwd?
                (<Changepwd goback={this.goback} isChangepwd={isChangepwd} record={record} />)
                 :
                <Table
                key={Id}
                pagination={{current:current,pageSize:pageSize,total:total}} onChange={this.changeTable} columns={columns} dataSource={users} />            
             } 
              </div> 
                {/* </Content> */}

            </div>



        )
    }

}


