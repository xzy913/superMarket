import { Component } from "react";
import { Input, message, Button, Popconfirm, Card, List, Divider, Image } from 'antd';
import binaryArrToUrl from '../../../../utils/binaryArrToUrl';
import { EditOutlined, CloseOutlined } from '@ant-design/icons'
import httpUtil from "../../../../utils/httpUtil";
import style from './showCommodities.module.css'

export class ShowCommodities extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            datas: {},
            data: {},
            isEdit: false,
        }
    }
    componentDidMount = () => {
        this.setState({
            data: this.props.data,
            datas: this.props.datas,
            
        })
    }
    // 属性函数化
    propertyEdit = (keyword) => {
        const item = this.state.data
        const isEdit = this.state.isEdit
        let tag = 0
        if (keyword === 'inventory' && item[keyword] < item['danger_inventory']) {
            tag = 1
        }
        return isEdit ? (
            <Input
                className="editInput"
                defaultValue={item[keyword]}
                style={{width:'50px'}}
                ref={(elev) => {
                    this[`${keyword}Elev`] = elev
                    console.log('this',this[`${keyword}Elev`]);
                }}
            />
        ) : tag ? (
            <span style={{ color: 'red' }}>{item[keyword]}</span>
        ) : (
            item[keyword]
        )
    }
    isEdit = () => {
        this.setState({
            isEdit: true
        })
    }
    comfirmEdit = () => {
        this.setState({
            isEdit:false
        })
        console.log('haha',this.currentPriceElev.input.value);
        const [_id, currentPrice, cost, inventory, sellingUnit, danger_inventory] =
            [
                this.state.data._id,
                Number(this.currentPriceElev.input.value) ,
                Number(this.costElev.input.value) ,
                Number(this.inventoryElev.input.value) ,
                this.sellingUnitElev.input.value,
                Number(this.danger_inventoryElev.input.value) ,
            ]
            console.log(_id, currentPrice, cost, inventory, sellingUnit, danger_inventory);
        const newData = {
            _id,
            currentPrice,
            cost,
            inventory,
            sellingUnit,
            danger_inventory,
        }
        httpUtil.updateCommodity(newData).then((res) => {
            message.success(res.message)
            console.log(res.data);
            let oldData = this.state.data
            let data = {...oldData, ...newData }
            this.setState({
                data: data,
                isEdit: false,
            })
        })

    }
    // 删除商品
    deleteCommodity = (item) => {
        this.props.deleteCommodity(item)
    }
    // 修改数据
    render() {
        const isEdit = this.state.isEdit
        const item = this.state.data
        // console.log('data',item);
        const { file = null, picMimetype = '' } = item
        const url = binaryArrToUrl(file, picMimetype)
        
        return (
            <div className={style.auto}>
                <Card

                    style={{ width: 300 }}
                    size="small"
                    cover={<Image
                        style={{ marginLeft: '10%' }}
                        width='230px'
                        preview={false}
                        src={url}></Image>}
                    title={item.title}
                    actions={[
                        isEdit ? (
                            <Button
                                type="primary"
                                size="small"
                                style={{ borderRadius: 5 }}
                                onClick={this.comfirmEdit}
                            >
                                确认
                            </Button>
                        ) : (
                            <EditOutlined key="edit" onClick={this.isEdit} />
                        ),
                        <Popconfirm
                            title="确定删除该商品吗?"
                            onConfirm={() => this.deleteCommodity(item)}
                            okText="确认"
                            cancelText="取消"

                        >
                            <CloseOutlined key="ellipsis" />
                        </Popconfirm>
                    ]}
                >
                    <p
                        style={{
                            margin: '10PX 0 0 0 ',
                            fontWeight: 900,
                            height: 29,
                            paddingLeft: 15,
                            paddingRight: 15,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize: 18,
                            textAlign: 'center',
                        }}
                        title={item.commodityName}
                    >
                        {item.commodityName}
                    </p>
                    <div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ marginLeft: 10 }}>火爆：{'😍'.repeat(item.popularity)} </div>
                            <div style={{ marginLeft: '80px' }}>分类：{item.category?.categoryName} <Divider style={{ margin: 0 }}></Divider></div>

                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ marginLeft: 10 }}>现价：{this.propertyEdit('currentPrice')}元</div>
                            <div style={{ marginLeft: '46px' }}>成本：{this.propertyEdit('cost')}元 <Divider style={{ margin: 0 }}></Divider></div>

                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ marginLeft: 10 }}>库存：{this.propertyEdit('inventory')}袋</div>
                            <div style={{ marginLeft: '40px' }}>销量：{item.salesVolume}袋 <Divider style={{ margin: 0 }} /></div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ marginLeft: 10 }}>警戒库存：{this.propertyEdit('danger_inventory')}袋</div>
                            <div style={{ marginLeft: '33px' }}>售卖单位：{this.propertyEdit('sellingUnit')}<Divider style={{ margin: 0 }} /><br /></div>
                        </div>
                        
                    </div>
                </Card>
            </div>
        )
    }
}




