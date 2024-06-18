export interface Campaign {
  CampaignName: string
  Datetime: string
  Revenue: number
  Commission: number
  Complete: number
  CampaignKey: string
  AppKey: number
}

export interface App {
  AppName: string
  Revenue: number
  Commission: number
  Complete: number
  AppKey: number
  Campaign: Campaign[]
}

export interface MonthlyData {
  Status: number
  Datetime: string
  Revenue: number
  Commission: number
  Complete: number
  AppKey: number
  App: App[]
}

export interface Payment {
  Revenue: number
  Commission: number
  Complete: number
  Monthly: MonthlyData[]
}

export interface RevenueData {
  Payment: Payment
  Result: boolean
  IsTest: boolean
  ResultCode: number
  ResultMsg: string
}
