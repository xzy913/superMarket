import { Component } from "react"
import HttpUtil from "../../../../utils/httpUtil"
import { nanoid } from 'nanoid'
import { InputNumber, Input, Form, Select, Button, message, PageHeader, Upload } from "antd"
import style from './addcommodities.module.css'
const { Option } = Select
export class Addcommodities extends Component {
    state = {
        subCategory: []
    }
    componentDidMount = () => {
        HttpUtil.getCategories({ count: 0, pageSize: 0 }).then((res) => {
            this.setState({
                subCategory: res.data.data,
            })
        })
    }
    showCategoryList = () => {
        return this.state.subCategory.map((item, index) => {
            return (
                <Option  value={`${item._id}`} key={nanoid()}>
                    {item.categoryName}
                </Option>
            )
        })
    }
    render() {
        const onFinish = (data) => {
            console.log(data);
            if (1==1
            ) {
                let formData = new FormData()
                formData.append('file', data.file.file)
                formData.append('cost', data.cost)
                formData.append('currentPrice', data.currentPrice)
                formData.append('inventory', data.inventory)
                formData.append('danger_inventory', data.danger_inventory)
                formData.append('commodityName', data.commodityName)
                formData.append('sellingUnit', data.sellingUnit)
                formData.append('category_id', data.category_id)
                console.log(formData);
                // file,commodityName,category_id,cost,currentPrice,inventory,danger_inventory,sellingUnit
                HttpUtil.addCommodities(formData).then((res) => {
                    message.success(res.data.message)
                    console.log();
                    window.location.href = '/home/commodities'
                })
            } else {
                message.warning('输入内容不能含有空格！')
            }
        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };
        return (
            <div>
                 <PageHeader
                        className="site-page-header"
                        onBack={() => {
                            const isAddcommodities = this.props.isAddcommodities
                            this.props.goBack(!isAddcommodities)
                        }}
                        subTitle="商品信息管理/新增商品"
                        style={{ paddingLeft: 10, backgroundColor: 'white' }}
                    />
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
                    className={style.form}
                >
                   
                    <Form.Item
                        label="商品名称"
                        name="commodityName"
                        required={false}
                        rules={[
                            {
                                required: true,
                                message: '请输入商品名称',
                            },
                        ]}
                    >
                        <Input className={style.input}/>
                    </Form.Item>

                    <Form.Item
                        label="商品分类"
                        name="category_id"
                        required={false}
                        rules={[
                            {
                                required: true,
                                message: '请输入商品分类名称',
                            },
                        ]}
                    >
                        <Select
                        className={style.input}
                            name="category_id"
                            style={{ width: 300 }}
                            ref={(elev) => {
                                this.categorySelect = elev
                            }}
                        // onChange={this.categorySelectChange}
                        >
                            {this.showCategoryList()}
                        </Select>

                    </Form.Item>

                    <Form.Item
                        label="商品成品"
                        name="cost"
                        required={false}
                        rules={[
                            {
                                required: true,
                                message: '请输入商品成本',
                            },
                        ]}
                    >
                        <InputNumber className={style.input} min={0} />
                    </Form.Item>
                    <Form.Item
                        label="商品现价"
                        name="currentPrice"
                        required={false}
                        rules={[{ required: true, message: '请输入商品现价！' }]}
                    >
                        <InputNumber className={style.input} min={0} />
                    </Form.Item>
                    <Form.Item
                        label="商品库存"
                        name="inventory"
                        required={false}
                        rules={[{ required: true, message: '请输入商品库存量！' }]}
                    >
                        <InputNumber className={style.input} min={0} />
                    </Form.Item>

                    <Form.Item
                        label="商品警戒库存"
                        name="danger_inventory"
                        required={false}
                        rules={[{ required: true, message: '请输入商品警戒库存量！' }]}
                    >
                        <InputNumber className={style.input} min={0} />
                    </Form.Item>

                    <Form.Item
                        label="售卖单位"
                        name="sellingUnit"
                        required={false}
                        rules={[{ required: true, message: '请输入商品产地！' }]}
                    >
                        <Input className={style.input} />
                    </Form.Item>

                    <Form.Item
                    style={{marginLeft:-90}}
                        label="图片地址:"
                        name="file"
                        required={false}
                        rules={[
                            {
                                required: true,
                                message: '请上传图片',
                            },
                        ]}
                    >
                        <Upload
                            name="file"
                            headers={{ authorization: 'authorization-text' }}
                            beforeUpload={() => {
                                return false
                            }}
                            maxCount={1}
                        >
                            <Button type="primary" size="middle" style={{ borderRadius: 5,marginLeft:'10px' }}>
                                上传图片
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" style={{borderRadius: 5,width:80,height:40}}>
                            添加
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}