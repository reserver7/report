import { useAlertContext } from '@/contexts/AlertContext'
import { useRevenueData, useYearlyRevenueData } from '@/hooks/useRevenueData'
import { selectedMonthState, selectedYearState } from '@/recoil'
import styled from '@emotion/styled'
import Button from '@shared/Button'
import Flex from '@shared/Flex'
import Input from '@shared/Input'
import Skeleton from '@shared/Skeleton'
import Spacing from '@shared/Spacing'
import Top from '@shared/Top'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import MonthlyRevenueTable from './MonthlyRevenueTable'
import RevenueChart from './RevenueChart'

const Dashboard: React.FC = () => {
  const [year, setYear] = useRecoilState(selectedYearState)
  const [month, setMonth] = useRecoilState(selectedMonthState)

  const { data, isLoading, isError } = useRevenueData(year, month)
  const { data: yearlyData } = useYearlyRevenueData(year)

  const [tempYear, setTempYear] = useState<number>(year)
  const [tempMonth, setTempMonth] = useState<number | undefined>(month)

  const { open } = useAlertContext()

  const handleSearch = () => {
    setYear(tempYear)
    setMonth(tempMonth)
  }

  useEffect(() => {
    if (isError || (!isLoading && !data?.Result)) {
      open({
        title: '에러 발생',
        description:
          '데이터를 불러오는 중 오류가 발생했습니다. 페이지를 리로드합니다.',
        onButtonClick: () => {
          window.location.reload()
        },
      })
    }
  }, [isError, isLoading, data?.Result, open])

  if (isLoading) {
    return (
      <Flex justify="center">
        <Spacing size={20} />
        <Flex direction="column">
          <Spacing size={10} />
          <Skeleton width="90vw" height={150} style={{ borderRadius: 8 }} />
          <Spacing size={10} />
          <Skeleton width="90vw" height="55vh" style={{ borderRadius: 8 }} />
          <Spacing size={10} />
          <Skeleton width="90vw" height="30vh" style={{ borderRadius: 8 }} />
        </Flex>
      </Flex>
    )
  }

  return (
    <DashboardContainer>
      <Top title={'캠페인별 수익 비율'} subTitle={''}></Top>
      <Filters>
        <Flex align="center">연도: </Flex>
        <Input
          type="number"
          value={tempYear}
          onChange={(e) => setTempYear(Number(e.target.value))}
        />
        <Flex align="center">월: </Flex>
        <Input
          type="number"
          value={tempMonth || ''}
          onChange={(e) => setTempMonth(Number(e.target.value) || undefined)}
        />
        <Button size="medium" onClick={handleSearch}>
          조회
        </Button>
      </Filters>

      {data && data.Result && (
        <>
          <RevenueChart data={data} />
          <Top title={'월별 성과'} subTitle={''}></Top>
          <MonthlyRevenueTable data={yearlyData} />
        </>
      )}
    </DashboardContainer>
  )
}

const DashboardContainer = styled.div`
  padding: 20px;
`

const Filters = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  input {
    width: 100px;
    padding: 5px;
    margin: 0 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`

export default Dashboard
