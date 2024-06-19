import { WithdrawalStatus } from '@/constants/WithdrawalStatus'
import { colors } from '@/styles/colorPalette'

interface StatusLabel {
  label: string
  color: string
}

export const useWithdrawalStatusLabel = () => {
  const getStatusInfo = (status: WithdrawalStatus | null): StatusLabel => {
    switch (status) {
      case WithdrawalStatus.REQUESTED:
        return { label: '출금 요청', color: colors.yellow }
      case WithdrawalStatus.REJECTED:
        return { label: '출금 거절', color: colors.red }
      case WithdrawalStatus.COMPLETED:
        return { label: '출금 완료', color: colors.purple }
      case WithdrawalStatus.CANCELED:
        return { label: '출금 취소', color: colors.gray }
      case WithdrawalStatus.AVAILABLE:
        return { label: '출금 가능', color: colors.blue }
      default:
        return { label: '', color: '' }
    }
  }

  return { getStatusInfo }
}
