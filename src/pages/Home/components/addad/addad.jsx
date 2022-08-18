import React, { Component } from 'react'
import { Form, Input, Button, message, PageHeader, Upload } from 'antd'
// import AD_NUMBER from '../../constant'
import httpUtil from '../../../../utils/httpUtil'
// import './index.css'

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 6 },
// }
// const tailLayout = {
//   wrapperCol: { offset: 10, span: 16 },
// }

export default class Addad extends Component {
    render() {
    //     const props = {
    //         name: 'file',
    //         action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //         headers: {
    //             authorization: 'authorization-text',
    //         },
    //         onChange(info) {
    //             if (info.file.status !== 'uploading') {
    //                 console.log(info.file, info.fileList);
    //             }

    //             if (info.file.status === 'done') {
    //                 message.success(`${info.file.name} file uploaded successfully`);
    //             } else if (info.file.status === 'error') {
    //                 message.error(`${info.file.name} file upload failed.`);
    //             }
    //         },
    //     }
        const onFinish = (data) => {
            if (
                data.adCompany.search(/\s/) === -1 &&
                data.adName.search(/\s/) === -1 &&
                data.adCategory.search(/\s/) === -1
              ) {
                let formData = new FormData()
                formData.append('file', data.file.file)
                formData.append('adCompany', data.adCompany)
                formData.append('adName', data.adName)
                formData.append('adCategory', data.adCategory)
                console.log('formData',formData);
                httpUtil.addAd(formData).then((res) => {
                  message.success(res.message)
                  window.location.href = '/home/ad'
                })
              } else {
                message.warning('输入内容不能含有空格！')
              }
        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };
        const adNumber = this.props
        return (
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
                <PageHeader
                    className="site-page-header"
                    onBack={() => {
                        const isAddad = this.props.isAddad
                        this.props.goBack(!isAddad)
                    }}
                    subTitle="广告投放管理/新增广告"
                    style={{ paddingLeft: 10, backgroundColor: 'white' }}
                />
                <Form.Item
                    label="广告公司"
                    name="adCompany"
                    required={false}
                    rules={[
                        {
                            required: true,
                            message: '请输入广告公司名称',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="广告名称"
                    name="adName"
                    required={false}
                    rules={[
                        {
                            required: true,
                            message: '请输入广告名称',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="所属分类"
                    name="adCategory"
                    required={false}
                    rules={[
                        {
                            required: true,
                            message: '请输入所属分类',
                        },
                    ]}
                >
                    <Input />
                    {/* <Checkbox>Remember me</Checkbox> */}
                </Form.Item>
                <Form.Item
                    label="图片地址"
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
                        <Button type="primary" size="middle" style={{ borderRadius: 5 }}>
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
                    <Button type="primary" htmlType="submit">
                        添加
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}