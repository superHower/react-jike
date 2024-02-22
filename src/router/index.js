// 路由配置

import Layout from '@/pages/Layout'
import Login from '@/pages/Login'

import { createBrowserRouter } from 'react-router-dom'
import { AuthRoute } from '@/components/AuthRoute'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRoute><Layout /></AuthRoute> // 通过AuthRoute包裹Layout组件，实现登录验证
  },
  {
    path: "/login",
    element: <Login />
  }
])

export default router