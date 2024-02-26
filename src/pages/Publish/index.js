import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { createArticleAPI, getChannelAPI } from '@/apis/article'

const { Option } = Select

const Publish = () => {
  // 1. 获取频道列表
  const [channelList, setChannelList] = useState([])

  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelAPI()
      setChannelList(res.data.channels)
    }
    getChannelList()
  }, [])

  // 2. 表单提交
  const onFinish = (formValue) => {
    console.log('表单信息：', formValue);
    const { title, content, channel_id } = formValue
    // 1. 按照接口文档的格式 处理收集到的表单数据
    const reqData = {
      title,
      content,
      cover: {
        type: 0,
        images: []
      },
      channel_id
    }
    // 2. 调用接口函数，提交表单数据
    createArticleAPI(reqData)
 }

 // 3. 上传图片
 const [imageList, setImageList] = useState([])
 const onChange = (value) => {
   console.log('正在上传中', value)
   setImageList(value.fileList)
 }
  // 4. 切换图片封面类型
  const [imageType, setImageType] = useState(0)
  const onTypeChange = (e) => {
    console.log('切换封面了', e.target.value)
    setImageType(e.target.value)
  }
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '发布文章' },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }} // 标签宽度
          wrapperCol={{ span: 16 }} // 表单项宽度
          initialValues={{ type: 0 }} // 表单默认值
          onFinish={onFinish} // 表单提交事件
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
            <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && <Upload
              listType="picture-card"
              showUploadList
              action={'http://geek.itheima.net/v1_0/upload'}
              name='image'
              onChange={onChange}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish