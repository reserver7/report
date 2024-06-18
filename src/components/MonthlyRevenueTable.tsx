import { useWithdrawalStatusLabel } from '@/hooks/useWithdrawalStatus'
import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { RevenueData } from '../types'
import Tag from './shared/Tag'

interface MonthlyPerformanceTableProps {
  data: RevenueData | undefined
}

const MonthlyPerformanceTable: React.FC<MonthlyPerformanceTableProps> = ({
  data,
}) => {
  const [expandedMonthIndex, setExpandedMonthIndex] = useState<number | null>(
    null,
  )
  const { getStatusInfo } = useWithdrawalStatusLabel()

  if (!data || !data.Payment || !data.Payment.Monthly) {
    return <div>데이터를 불러오는 중입니다...</div>
  }

  const toggleMonth = (index: number) => {
    setExpandedMonthIndex(expandedMonthIndex === index ? null : index)
  }

  const totalRevenue = data.Payment.Monthly.reduce(
    (acc, month) => acc + month.Revenue,
    0,
  )
  const totalCommission = data.Payment.Monthly.reduce(
    (acc, month) => acc + month.Commission,
    0,
  )
  const totalComplete = data.Payment.Monthly.reduce(
    (acc, month) => acc + month.Complete,
    0,
  )

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <th>개요</th>
            <th>광고수익</th>
            <th>플랫폼수수료</th>
            <th>세금계산서 발행금액</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>총합</td>
            <td>{totalRevenue.toLocaleString()}원</td>
            <td>{totalCommission.toLocaleString()}원</td>
            <td>{totalComplete.toLocaleString()}건</td>
            <td>-</td>
          </tr>
          {data.Payment.Monthly.map((month, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => toggleMonth(index)}>
                <td>
                  {new Date(
                    parseInt(month.Datetime.substr(6)),
                  ).toLocaleDateString()}
                </td>
                <td>{month.Revenue.toLocaleString()}원</td>
                <td>{month.Commission.toLocaleString()}원</td>
                <td>{month.Complete.toLocaleString()}건</td>
                <td>
                  <Tag backgroundColor={getStatusInfo(month.Status).color}>
                    {getStatusInfo(month.Status).label}
                  </Tag>
                </td>
              </tr>
              {expandedMonthIndex === index && (
                <tr>
                  <td colSpan={5}>
                    <CampaignDetails>
                      <CampaignTable>
                        <thead>
                          <tr>
                            <th>{month.App[0].AppName}</th>
                            <th>{month.App[0].Revenue.toLocaleString()}원</th>
                            <th>
                              {month.App[0].Commission.toLocaleString()}원
                            </th>
                            <th>{month.App[0].Complete.toLocaleString()}건</th>
                          </tr>
                        </thead>
                        <tbody>
                          {month.App.flatMap((app) =>
                            app.Campaign.map((campaign, idx) => (
                              <tr key={idx}>
                                <td>{campaign.CampaignName}</td>
                                <td>{campaign.Revenue.toLocaleString()}원</td>
                                <td>
                                  {campaign.Commission.toLocaleString()}원
                                </td>
                                <td>{campaign.Complete.toLocaleString()}건</td>
                              </tr>
                            )),
                          )}
                        </tbody>
                      </CampaignTable>
                    </CampaignDetails>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  )
}

const TableContainer = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 0.9em;
  font-family: Arial, sans-serif;
  min-width: 400px;
  border-radius: 5px 5px 0 0;
  overflow: hidden;

  thead tr {
    background-color: ${colors.blue};
    color: #ffffff;
    text-align: center;
    font-weight: bold;
  }

  th,
  td {
    padding: 12px 15px;
    text-align: center;
    cursor: pointer;
  }

  tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  tbody tr:last-of-type {
    border-bottom: 2px solid ${colors.blue};
  }

  tbody tr:hover {
    background-color: #e2f0f1;
    cursor: pointer;
  }
`

const CampaignDetails = styled.div`
  margin-top: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const CampaignTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;

  thead tr {
    background-color: ${colors.blue};
    color: #ffffff;
    font-weight: bold;
  }

  th,
  td {
    padding: 8px 12px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }

  thead tr:hover {
    background-color: ${colors.blue};
  }

  tbody tr:hover {
    background-color: transparent;
  }
`

export default MonthlyPerformanceTable
