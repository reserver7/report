// src/hooks/useRevenueData.ts
import { useQuery } from 'react-query'
import apiClient from '../api/apiClient'
import { RevenueData } from '../types'

const fetchRevenueData = async (
  year: number,
  month?: number,
): Promise<RevenueData> => {
  const response = await apiClient.post('/GetDemoData', {
    search_year: year,
    search_month: month,
  })
  return response.data
}

const fetchYearlyRevenueData = async (year: number): Promise<RevenueData> => {
  const response = await apiClient.post('/GetDemoData', {
    search_year: year,
  })
  return response.data
}

const useRevenueData = (year: number, month?: number) => {
  return useQuery(['revenueData', year, month], () =>
    fetchRevenueData(year, month),
  )
}

const useYearlyRevenueData = (year: number) => {
  return useQuery(['yearlyRevenueData', year], () =>
    fetchYearlyRevenueData(year),
  )
}

export { useRevenueData, useYearlyRevenueData }
