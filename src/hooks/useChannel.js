import { useState, useEffect } from 'react'
import { getChannelAPI } from '@/apis/article'

// 1. 定义自定义hook
function useChannel () {
  const [channelList, setChannelList] = useState([])
  useEffect(() => {
    const getChannelList = async () => {// 1. 获取频道列表 接口
      const res = await getChannelAPI()
      setChannelList(res.data.channels)
    }
    getChannelList()// 2. 调用函数
  }, [])

  return {
    channelList // 3. 返回频道列表
  }
}

export { useChannel } // 4. 导出自定义hook