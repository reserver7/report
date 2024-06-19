import styled from '@emotion/styled'
import { ChartOptions } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { RevenueData } from '../types'

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
ChartJS.register(ArcElement, Legend, Tooltip)

interface RevenueChartProps {
  data: RevenueData | undefined
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  if (!data || !data.Payment || !data.Payment.Monthly) {
    return <div>데이터를 불러오는 중입니다...</div>
  }

  const campaigns = data.Payment.Monthly.flatMap((month) =>
    month.App.flatMap((app) =>
      app.Campaign.map((campaign) => ({
        campaignName: campaign.CampaignName,
        revenue: campaign.Revenue,
      })),
    ),
  )

  const chartData = {
    labels: campaigns.map((campaign) => campaign.campaignName),
    datasets: [
      {
        label: '수익',
        data: campaigns.map((campaign) => campaign.revenue),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options: ChartOptions<'doughnut'> = {
    plugins: {
      tooltip: {
        callbacks: {
          label: ({ dataIndex }) => {
            return `${chartData.labels[dataIndex]}: ${chartData.datasets[0].data[dataIndex].toLocaleString()}원`
          },
        },
      },
      legend: {
        display: true,
      },
    },
  }

  return (
    <ChartContainer>
      <Doughnut data={chartData} options={options} />
    </ChartContainer>
  )
}

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f9f9f9;
  border-radius: 10px;
  width: 100%;
  height: 500px;
  overflow-y: auto;
`

export default RevenueChart
