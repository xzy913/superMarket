import {message,Upload,Image, Popconfirm, Button, Space, Table, Tag, Divider } from 'antd';
import HttpUtil from '../../../utils/httpUtil';
import React, { Component, Link, Routes, Route } from 'react';
import DescriptionWrapper from '../../../common/descriptionWrapper/descriptionWrapper';
import Addad from './addad/addad';
import binaryArrToUrl from '../../../utils/binaryArrToUrl';

export class Ad extends Component {
  state = {
    ads: [],
    isAddad: false,
    _id:''
  }
  property = {
    name: 'file',
    showUploadList: false,
    customRequest: (data) => {
      let formData = new FormData()
      formData.append('file', data.file)
      formData.append('_id', this.state._id)
      HttpUtil.updateAd(formData).then((res) => {
        // console.log(res)
        message.success(res.message)
        this.componentDidMount()
      })
    },
    maxCount: 1,
  }
  componentDidMount() {
    HttpUtil.getAds().then(
      (res) => {
        const data = res.data
        console.log('广告',res.data);
        this.setState({ ads: data })
      }
    )
  }
  changeTable = () => {
    this.componentDidMount()
  }
  isAddadTrue = () => {
    this.setState({
      isAddad: true
    })
  }
  goBack=()=>{
    this.setState({
      isAddad: false
    })
  }
  deleteAds=(record)=>{
    // if (window.confirm('确定删除吗')) {
      HttpUtil.deleteAd({ _id: record._id }).then(
          (res) => {
             console.log(res);
             this.changeTable()
          }
      )
  // }
  }
  changePic=(_id)=>{
    this.setState({_id})
    // console.log(record);
  }
  render() {
    const columns = [
      {
        title: '广告公司',
        dataIndex: 'adCompany',
        key: 'adCompany',
        render: (text) => <a>{text}</a>,
      },
      {
        title: '广告名称',
        dataIndex: 'adName',
        key: 'adName',
      },
      {
        title: '所属分类',
        dataIndex: 'adCategory',
        key: 'adCategory',
      },
      {
        title: '广告图片',
        key: 'file',
        dataIndex: 'file',
        render: (_, ad) => {
          const { picMimetype, file } = ad
          const url = binaryArrToUrl(file, picMimetype)
          return <Image preview={false} width={150} src={url} />
        },
      },
      {
        title: '操作',
        key: 'action',
        dataIndex: '_id',
        render: (_id,record) => (
          <Space size="middle">
            <Upload
            data
            {...this.property}
                    >
            <Button
              onClick={()=>this.changePic(_id)}
              danger
              type='primary'>更改图片</Button>
              </Upload>
            <Button
             danger
              className="ant-btn ant-btn-primary ant-btn-dangerous"
              type="primary"
              // onClick={()=>this.deleteAds(record)}
              >
                 <Popconfirm
                title="确定删除该广告吗?"
                onConfirm={()=>this.deleteAds(record)}
                okText="确认"
                cancelText="取消"
              >
                删除广告
              </Popconfirm>
              </Button>
    
          </Space>
        ),
      },
    ];
    const { ads, isAddad } = this.state
    const adNumber = this.state.ads?.length
    return (
      <div>
        <DescriptionWrapper
          title=' 广告管理' details='广告信息展示，可以进行新增广告，更改广告，删除广告操作。注意：最多只允许5个广告位' />
        <Divider style={{ margin: 0 }} />
        <Button type='primary' onClick={this.isAddadTrue}>
          新增广告
        </Button>
        <div>
          {isAddad?
          <Addad goBack={this.goBack} isAddad={isAddad} adNumber={adNumber}/>
          :
          <Table pagination={false} onChange={this.changeTable} columns={columns} dataSource={ads} />
        }
        </div>
             
      </div>
    )
  }


}
