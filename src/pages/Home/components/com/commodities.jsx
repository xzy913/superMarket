import React, { Component } from 'react'
import HttpUtil from '../../../../utils/httpUtil';
import {Table, Form, message, Input, Row, Col, Card, List, Divider, Image, Select, Button } from 'antd';
import { nanoid } from 'nanoid'
import binaryArrToUrl from '../../../../utils/binaryArrToUrl';
import DescriptionWrapper from '../../../../common/descriptionWrapper/descriptionWrapper';
import { ShowCommodities } from './showCommodities'
import { Addcommodities } from '../addcommodities/addcommodities'
import { SearchOutlined } from '@ant-design/icons'
import style from '../../auto.module.css'
import '../../home.css'
const { Option } = Select
export class Commodities extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            url: {},
            subCategory: [],
            loading: false,
            lazyLoading: true,
            hasMore: true,
            isAddcommodities: false,
            count: 0,
            pageSize: 8,
            total: 0,
            searchCondition: {
                popularity: '',
                commodityName: '',
                category_id: '',
                inventoryStatus: '',
            },
        }
    }
    componentDidMount = () => {
        const data = this.state.data
        const count = this.state.count +1
        const pageSize = this.state.pageSize
        // const pageSize = 10
        const searchCondition = this.state.searchCondition
        // console.log(count, pageSize);
        // 请求商品
        HttpUtil.getCommodities({
            count,
            pageSize,
            ...searchCondition
        })
            .then((res) => {
                this.setState({
                    count: count,
                })
                // console.log(res.data)
                const newdata = data.concat(res.data.data)
                this.setState({ data: newdata, total: res.data.total })
                // this.componentDidMount()
                if (count * pageSize <= res.data.total) {
                    this.componentDidMount()
                }else{
                    console.log('展示完毕');
                }
            })
        
    }
    // 请求商品分类
    getCategories=()=>{
        HttpUtil.getCategories({ count: 0, pageSize: 0 }).then((res) => {
            this.setState({
                subCategory: res.data.data,
            })
        })
    } 
    // 展示商品
    showCommodity = (data) => {
        return data.map((item, index) => {
            return (
                // 循环项的key值，不要用index，可以用nanoid来设置
                <Col span={6} style={{ marginBottom: 20 }} key={nanoid()}>
                    <ShowCommodities changeList={this.changeList} datas={data} data={item} deleteCommodity={this.deleteCommodity} />
                </Col>
            )
        })
    }
    // 商品分类列表
    showCategoryList = () => {
        return this.state.subCategory.map((item, index) => {
            return (
                <Option value={`${item._id}`} key={nanoid()}>
                    {item.categoryName}
                </Option>
            )
        })
    }
    // 删除商品
    deleteCommodity=(item)=>{
        const data = this.state.data
        const curTotal = data.length + ''
        const {_id,category_id} = item
        HttpUtil.deleteCommodities({
            _id,category_id,curTotal
        }).then((res)=>{
            this.setState({
                data:res.data.data
            })
            message.success(res.data.msg)
            console.log(res.data.data);
            // console.log(this.props.changeList);

        })
    }
    // 更新界面
    changeList=()=>{
        this.componentDidMount()
    }
    // 搜索商品
    // ComSearch=()=>{

    // }
    // 搜索商品界面
    searchCommodities = () => {
        const onFinish = (data) => {
            const { 
                popularity= '',
                commodityName= '',
                category_id='',
                inventoryStatus=''
            }=data
            console.log('11',popularity);
            const datas = []
            const pageSize = this.state.pageSize
            console.log('22',data);
            HttpUtil.getCommodities({ count:1, pageSize,popularity,commodityName,category_id,inventoryStatus }).then((res) => {
                message.success(res.data.message)
                console.log(res.data);
                const newdata = datas.concat(res.data.data)
                console.log('newdata',newdata);
                this.setState({data:newdata})
            }
            )
        }

        return (
            <div>
                <Form
                    style={{ display: 'flex' }}
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
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className={style.form}
                >
                    <Form.Item name='popularity' label='火爆程度：'>

                        <Select
                            name="popularity"
                            style={{ width: 100 }}
                            ref={(elev) => {
                                this.popularitySelect = elev
                            }}
                            onChange={this.popularitySelectChange}
                        >
                            <Option value="4">😍X4</Option>
                            <Option value="3">😍X3</Option>
                            <Option value="2">😍X2</Option>
                            <Option value="1">😍X1</Option>
                            <Option value=''></Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name='commodityName' label='商品名称'>
                        <Input
                            style={{ width: '200px' }}
                            name="commodityName"
                            className="CimInput"
                            ref={(elev) => {
                                this.nameInput = elev
                            }}
                        />
                    </Form.Item>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Form.Item name="category_id" label=' 商品分类' onClick={this.getCategories}>
                        <Select
                            name="category_id"
                            style={{ width: 100 }}
                            ref={(elev) => {
                                this.categorySelect = elev
                            }}
                        >
                            {this.showCategoryList()}
                        </Select>
                    </Form.Item>
                    <Form.Item name="inventorystatus" label='库存状态'>

                        <Select
                            name="inventoryStatus"
                            style={{ width: 100 }}
                            ref={(elev) => {
                                this.inventoryStatusSelect = elev
                            }}
                            onChange={this.inventoryStatusSelectChange}
                        >
                            <Option value="1">充足</Option>
                            <Option value="0">需补货</Option>
                        </Select>
                    </Form.Item>
                    <Button
                        type="primary"
                        shape="circle"
                        htmlType="submit"
                        icon={<SearchOutlined />}
                    />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button onClick={this.isAddcommodities} type="primary" style={{ borderRadius: 5 }}>
                        添加商品
                    </Button>
                </Form>
            </div>
        )
    }

    isAddcommodities = () => {
        this.setState({
            isAddcommodities: true
        })
    }
    goBack = () => {
        this.setState({
            isAddcommodities: false
        })
    }
    render() {
        const item = this.state.data
        const { isAddcommodities } = this.state
        const onScroll = () => {

        }
        return (
            <div style={{ width: 1519 }} onScroll={this.handleInfiniteOnLoad} >
                <DescriptionWrapper
                    title='商品管理' details='仓库商品信息展示，可以进行新增商品，搜索商品，编辑商品，删除商品操作' />
                <Divider style={{ margin: 0 }} />
                {/* 展示搜索区 */}
                {this.searchCommodities()}
                {/* 展示商品 */}
                <div onChange={this.changeList}>

                    {this.state.isAddcommodities ?
                        <Addcommodities
                            goBack={this.goBack} isAddcommodities={isAddcommodities}
                        />
                        :
                        <Row gutter={10} className={style.auto}>
                            {this.showCommodity(item)}
                        </Row>
                    }
                </div>
            </div>
        )
    }
}