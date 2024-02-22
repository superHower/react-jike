import { request } from "@/utils"
import { useEffect } from "react"

const Layout =() => {
  useEffect(() => {
    request.get("/user/profile").then(res => {
      console.log(res)
    })
  }, [])
  return <div>this is Layout</div>
}

export default Layout