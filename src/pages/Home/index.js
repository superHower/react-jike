import * as echarts from 'echarts';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    // 获取图表的Dom节点
    const chartDom = document.getElementById('main');
    // 初始化图表
    const myChart = echarts.init(chartDom);
    // 配置图表
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    };
    // 设置图表配置项
    option && myChart.setOption(option);
  }, []);
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the Home page</p>
      <div id='main' style={{width: '500px', height: '400px'}}>

      </div>
    </div>
  );
}
export default Home;