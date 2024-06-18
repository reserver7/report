import { atom } from 'recoil'

export const selectedYearState = atom<number>({
  key: 'selectedYearState',
  default: 2021,
})

export const selectedMonthState = atom<number | undefined>({
  key: 'selectedMonthState',
  default: undefined,
})
