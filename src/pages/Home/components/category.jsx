import { render } from '@testing-library/react';
import {Popconfirm, Input, Space, Button, Table, Divider, List, Typography, message } from 'antd';
import React, { Component } from 'react'
import HttpUtil from '../../../utils/httpUtil';
import DescriptionWrapper from '../../../common/descriptionWrapper/descriptionWrapper';

export class Category extends Component {
  state = {
    isAddCategory: false,
    datas: [],
    value: ''
  }
  componentDidMount() {
    HttpUtil.getCategories({
      count: 1,
      pageSize: 10
    }

    ).then((res) => {
      // const data= res.data.data
      // const {categoryname,total} =res.data.data
      const { data } = res.data
      console.log('11',data);
      this.setState({
        // categoryName: data.categoryName, total: data.total, 
        datas: data
      })
    })
  }
  changeList = () => {
    this.componentDidMount()
  }
  AddCategoryIsTrue = () => {
    this.setState({
      isAddCategory: true,
    })
  }
  AddCategoryIsFalse = () => {
    this.setState({
      isAddCategory: false,
    })
  }
  getValue = (e) => {
    const value = e.target.value
    this.setState({
      value: value
    })
  }
  AddCategory = () => {
    HttpUtil.addCategory({
      "categoryName": this.state.value,
      "curTotal": "123456"
    }).then(
      (res) => {
        this.componentDidMount()
        message.success('商品新增成功');
      }
    )
  }
  deleteCategory = (items) => {
    console.log(this.state.datas.length);
    const curTotal = this.state.datas.length
    HttpUtil.deleteCategory({
      _id:items,
      curTotal:curTotal
    }
    ).then(
      (res) => {
        message.success('商品分类删除成功')
        this.componentDidMount()
      }
    )
  }
  render() {
    const { datas, isAddCategory } = this.state
    // console.log(datas);

    return (
      <div>
        <DescriptionWrapper
          title='分类管理' details='商品分类展示，新增分类，删除分类' />
        <Divider style={{ margin: 0 }} />
        <Space style={{ marginTop: 20 }} size={20}>
          {isAddCategory ? (
            <>
              <div>
                分类名称:
                <Input
                  onChange={this.getValue}
                  name="category"
                  className="CimInput"
                  ref={(elev) => {
                    this.categoryInput = elev
                  }}
                />
              </div>
              <Button
                type="primary"
                style={{ borderRadius: 5 }}
                onClick={this.AddCategory}
              >
                确定
              </Button>
              <Button
                type="primary"
                danger
                style={{ borderRadius: 5 }}
                onClick={this.AddCategoryIsFalse}
              >
                取消
              </Button>
            </>
          ) : (
            <Button
              type="primary"
              style={{ borderRadius: 5 }}
              onClick={this.AddCategoryIsTrue}
            >
              新增分类
            </Button>
          )}
        </Space>
        {/* <Button type='primary'>新增分类</Button> */}
        <List
          itemLayout="horizontal"
          dataSource={datas}
          renderItem={(items) => (
            <List.Item>
              <List.Item.Meta

                title={`${items.categoryName}类`}
                description={`共计商品${items.total}个`}
              ></List.Item.Meta>
              <Button type="primary" danger style={{ borderRadius: 5 }}>
                      <Popconfirm
                        title="确定删除该分类吗?"
                        onConfirm={this.deleteCategory.bind(this, items._id)}
                        okText="确认"
                        cancelText="取消"
                      >
                        删除分类
                      </Popconfirm>
                    </Button>
            </List.Item>
          )}
        />
      </div>
    )
  }
}
