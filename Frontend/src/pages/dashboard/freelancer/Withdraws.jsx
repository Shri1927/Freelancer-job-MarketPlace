import { useState } from 'react';
import { Wallet, DollarSign, CreditCard, History } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WithdrawBalanceCard } from '@/components/withdraws/WithdrawBalanceCard';
import { WithdrawForm } from '@/components/withdraws/WithdrawForm';
import { PaymentMethodManager } from '@/components/withdraws/PaymentMethodManager';
import { WithdrawalHistory } from '@/components/withdraws/WithdrawalHistory';
import { toast } from 'sonner';

const Withdraws = () => {
  // Mock data - Replace with actual API calls
  const [availableBalance] = useState(8200);
  const [pendingClearance] = useState(4200);
  const [inProgress] = useState(3500);
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 'method-1',
      type: 'bank',
      accountName: 'John Doe',
      accountNumber: '1234567890',
      routingNumber: '987654321',
      bankName: 'Chase Bank',
      isPrimary: true,
      isVerified: true,
      createdAt: '2024-01-15T10:00:00Z',
    },
    {
      id: 'method-2',
      type: 'paypal',
      email: 'john.doe@example.com',
      isPrimary: false,
      isVerified: true,
      createdAt: '2024-01-20T10:00:00Z',
    },
  ]);
  const [withdrawals, setWithdrawals] = useState([
    {
      id: 'wd-1',
      amount: 2000,
      fee: 0,
      totalAmount: 2000,
      method: 'bank',
      methodName: 'Bank Transfer',
      status: 'completed',
      createdAt: '2024-02-01T10:00:00Z',
      completedAt: '2024-02-04T10:00:00Z',
    },
    {
      id: 'wd-2',
      amount: 1500,
      fee: 1.5,
      totalAmount: 1498.5,
      method: 'paypal',
      methodName: 'PayPal',
      status: 'completed',
      createdAt: '2024-01-28T10:00:00Z',
      completedAt: '2024-01-28T10:30:00Z',
    },
    {
      id: 'wd-3',
      amount: 3000,
      fee: 0,
      totalAmount: 3000,
      method: 'bank',
      methodName: 'Bank Transfer',
      status: 'processing',
      createdAt: '2024-01-25T10:00:00Z',
    },
    {
      id: 'wd-4',
      amount: 800,
      fee: 12,
      totalAmount: 788,
      method: 'wallet',
      methodName: 'Digital Wallet',
      status: 'completed',
      createdAt: '2024-01-20T10:00:00Z',
      completedAt: '2024-01-22T10:00:00Z',
    },
    {
      id: 'wd-5',
      amount: 1200,
      fee: 1.5,
      totalAmount: 1198.5,
      method: 'paypal',
      methodName: 'PayPal',
      status: 'pending',
      createdAt: '2024-02-10T10:00:00Z',
    },
  ]);

  // Handler for adding payment method
  const handleAddPaymentMethod = (methodData) => {
    setPaymentMethods([...paymentMethods, methodData]);
  };

  // Handler for updating payment method
  const handleUpdatePaymentMethod = (updatedMethod) => {
    setPaymentMethods(
      paymentMethods.map((method) =>
        method.id === updatedMethod.id ? updatedMethod : method
      )
    );
  };

  // Handler for deleting payment method
  const handleDeletePaymentMethod = (methodId) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== methodId));
  };

  // Handler for setting primary payment method
  const handleSetPrimaryPaymentMethod = (methodId) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isPrimary: method.id === methodId,
      }))
    );
  };

  // Handler for creating withdrawal
  const handleWithdraw = (withdrawalData) => {
    const newWithdrawal = {
      ...withdrawalData,
      id: `wd-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setWithdrawals([newWithdrawal, ...withdrawals]);
    
    // Update available balance (in real app, this would come from backend)
    // setAvailableBalance(availableBalance - withdrawalData.amount);
  };

  // Handler for cancelling withdrawal
  const handleCancelWithdrawal = (withdrawalId) => {
    setWithdrawals(
      withdrawals.map((wd) =>
        wd.id === withdrawalId
          ? { ...wd, status: 'cancelled', cancelledAt: new Date().toISOString() }
          : wd
      )
    );
  };

  return (
    <div className=" bg-gray-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Withdraw Funds
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage your withdrawals and payment methods
          </p>
        </div>

        {/* Balance Card */}
        <div className="mb-6 md:mb-8">
          <WithdrawBalanceCard
            availableBalance={availableBalance}
            pendingClearance={pendingClearance}
            inProgress={inProgress}
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="withdraw" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
            <TabsTrigger value="withdraw" className="gap-2">
              <DollarSign className="w-4 h-4" />
              Withdraw
            </TabsTrigger>
            <TabsTrigger value="methods" className="gap-2">
              <CreditCard className="w-4 h-4" />
              Payment Methods
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="w-4 h-4" />
              History
            </TabsTrigger>
          </TabsList>

          {/* Withdraw Tab */}
          <TabsContent value="withdraw" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WithdrawForm
                availableBalance={availableBalance}
                paymentMethods={paymentMethods}
                onWithdraw={handleWithdraw}
              />
              <div className="lg:order-first">
                <WithdrawalHistory
                  withdrawals={withdrawals.slice(0, 5)}
                  onCancel={handleCancelWithdrawal}
                />
              </div>
            </div>
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="methods" className="space-y-6">
            <PaymentMethodManager
              paymentMethods={paymentMethods}
              onAdd={handleAddPaymentMethod}
              onUpdate={handleUpdatePaymentMethod}
              onDelete={handleDeletePaymentMethod}
              onSetPrimary={handleSetPrimaryPaymentMethod}
            />
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <WithdrawalHistory
              withdrawals={withdrawals}
              onCancel={handleCancelWithdrawal}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Withdraws;










