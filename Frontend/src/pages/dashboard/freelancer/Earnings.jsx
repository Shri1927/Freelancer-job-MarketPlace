import { useState, useEffect } from "react"
import { DollarSign, Bell, Search, Settings, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import EarningsSummary from "@/components/earnings/EarningsSummary"
import EarningsChart from "@/components/earnings/EarningsChart"
import ClientBreakdown from "@/components/earnings/ClientBreakdown"
import PaymentTracking from "@/components/earnings/PaymentTracking"
import QuickStats from "@/components/earnings/QuickStats"
import EarningsActions from "@/components/earnings/EarningsActions"
import { paymentsAPI } from "@/services/api"
import { toast } from "sonner"

const Earnings = () => {
  const [earningsData, setEarningsData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEarnings()
  }, [])

  const loadEarnings = async () => {
    try {
      setLoading(true)
      const [earningsResponse, totalResponse] = await Promise.all([
        paymentsAPI.getEarnings(),
        paymentsAPI.getTotalEarnings(),
      ])
      
      setEarningsData({
        earnings: earningsResponse.data.data || earningsResponse.data || [],
        total: totalResponse.data.total || totalResponse.data || 0,
      })
    } catch (error) {
      console.error('Error loading earnings:', error)
      toast.error('Failed to load earnings data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
     

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-[1600px] mx-auto">
        {/* Page Header */}
        <div className="mb-8 animate-fade-up">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Earnings Overview
              </h2>
              <p className="text-muted-foreground mt-1">
                Track your income, payments, and financial growth
              </p>
            </div>
            
          </div>
        </div>

        {/* Summary Cards */}
        <section className="mb-8">
          <EarningsSummary />
        </section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Charts & Breakdown */}
          <div className="xl:col-span-2 space-y-6 lg:space-y-8">
            <div
              className="animate-fade-up"
              style={{ animationDelay: "100ms" }}
            >
              <EarningsChart />
            </div>
            <div
              className="animate-fade-up"
              style={{ animationDelay: "200ms" }}
            >
              <ClientBreakdown />
            </div>
            <div
              className="animate-fade-up"
              style={{ animationDelay: "300ms" }}
            >
              <PaymentTracking />
            </div>
          </div>

          {/* Right Column - Stats & Actions */}
          <div className="space-y-6 lg:space-y-8">
            <div
              className="animate-fade-up"
              style={{ animationDelay: "150ms" }}
            >
              <QuickStats />
            </div>
            <div
              className="animate-fade-up"
              style={{ animationDelay: "250ms" }}
            >
              <EarningsActions />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Earnings
