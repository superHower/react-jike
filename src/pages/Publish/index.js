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
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { createArticleAPI, getArticleById } from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'

const { Option } = Select

const Publish = () => {
  // 1. 自定义Hook 获取频道列表
  const { channelList } = useChannel()

  // 2. 表单提交
  const onFinish = (formValue) => {
    console.log('表单信息：', formValue);
    if (imageList.length !== imageType)
      return message.warning('封面类型和图片数量不匹配')
    const { title, content, channel_id } = formValue
    // 1. 按照接口文档的格式 处理收集到的表单数据
    const reqData = {
      title, // 文章标题
      content, // 富文本编辑器的内容
      cover: {
        type: imageType, // 封面模式类型
        images: imageList.map(item => item.response.data.url) // 封面图片url列表
      },
      channel_id // 频道id
    }
    // 2. 调用接口函数，提交表单数据
    createArticleAPI(reqData)
    message.success('文章发布成功')
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

  // 5. 数据回显
  const [searchParams] = useSearchParams() // 获取url参数
  const articleId = searchParams.get('id') // 获取文章id
  const [form] = Form.useForm() // 获取表单实例
  useEffect(() => {
    async function getArticleDetail () {
      const res = await getArticleById(articleId) // 根据文章id获取文章详情
      const data = res.data
      const { cover } = data
      form.setFieldsValue({
        ...data,
        type: cover.type
      })
      // 回填图片列表
      setImageType(cover.type)
      // 显示图片({url:url})
      setImageList(cover.images.map(url => {
        return { url }
      }))
    }
    getArticleDetail()
  }, [articleId, form]) // form和id 依赖变化时重新执行


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
          form={form} // 绑定表单实例
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
              listType="picture-card" // 上传框的外观类型
              showUploadList // 是否显示上传列表
              action={'http://geek.itheima.net/v1_0/upload'} // 上传图片的地址
              name='image' // 上传图片的文件名
              onChange={onChange}
              maxCount={imageType} // 最大上传数量
              fileList={imageList} // 图片列表
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