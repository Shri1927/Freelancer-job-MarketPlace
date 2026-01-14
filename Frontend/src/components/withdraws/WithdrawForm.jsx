import { useState } from 'react';
import { DollarSign, ArrowRight, Building, CreditCard, Landmark, Wallet, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const paymentMethods = [
  { 
    id: 'bank', 
    name: 'Bank Transfer', 
    icon: Building, 
    description: 'Direct to your bank account', 
    fee: 'Free',
    time: '3-5 business days'
  },
  { 
    id: 'paypal', 
    name: 'PayPal', 
    icon: CreditCard, 
    description: 'Instant transfer', 
    fee: '$1.50',
    time: 'Instant'
  },
  { 
    id: 'wise', 
    name: 'Wise', 
    icon: Landmark, 
    description: 'Low international fees', 
    fee: '0.5%',
    time: '1-2 business days'
  },
  { 
    id: 'wallet', 
    name: 'Digital Wallet', 
    icon: Wallet, 
    description: 'Cryptocurrency wallet', 
    fee: '1.5%',
    time: '1-2 business days'
  },
];

export const WithdrawForm = ({ 
  availableBalance, 
  paymentMethods: savedPaymentMethods = [],
  onWithdraw 
}) => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('bank');
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const calculateFee = (amount, methodId) => {
    const method = paymentMethods.find(m => m.id === methodId);
    if (!method) return 0;
    
    if (method.fee === 'Free') return 0;
    if (method.fee.includes('%')) {
      const percentage = parseFloat(method.fee.replace('%', ''));
      return (amount * percentage) / 100;
    }
    if (method.fee.includes('$')) {
      return parseFloat(method.fee.replace('$', ''));
    }
    return 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const amount = parseFloat(withdrawAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (amount < 10) {
      toast.error('Minimum withdrawal amount is $10');
      return;
    }
    
    if (amount > availableBalance) {
      toast.error('Amount exceeds available balance');
      return;
    }

    // Check if payment method is selected
    const method = paymentMethods.find(m => m.id === selectedMethod);
    const savedMethod = savedPaymentMethods.find(m => m.type === selectedMethod && m.isPrimary);
    
    if (!savedMethod && selectedMethod !== 'bank') {
      toast.error(`Please add and verify your ${method?.name} account first`);
      return;
    }

    const fee = calculateFee(amount, selectedMethod);
    const totalAmount = amount - fee;

    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setWithdrawAmount('');
      
      const withdrawalData = {
        amount,
        fee,
        totalAmount,
        method: selectedMethod,
        methodName: method?.name,
        paymentMethodId: selectedPaymentMethodId || savedMethod?.id,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      if (onWithdraw) {
        onWithdraw(withdrawalData);
      }

      toast.success(`Withdrawal of ${formatCurrency(amount)} initiated!`, {
        description: `You will receive ${formatCurrency(totalAmount)} after fees. Expected in ${method?.time}.`,
      });
    }, 1500);
  };

  const setMaxAmount = () => {
    setWithdrawAmount(availableBalance.toFixed(2));
  };

  const handleQuickAmount = (percentage) => {
    const amount = (availableBalance * percentage / 100).toFixed(2);
    setWithdrawAmount(amount);
  };

  const selectedMethodInfo = paymentMethods.find(m => m.id === selectedMethod);
  const fee = calculateFee(parseFloat(withdrawAmount) || 0, selectedMethod);
  const netAmount = (parseFloat(withdrawAmount) || 0) - fee;

  // Get saved payment methods for selected type
  const availableSavedMethods = savedPaymentMethods.filter(
    m => m.type === selectedMethod && (m.isVerified || selectedMethod === 'bank')
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Withdraw Funds</CardTitle>
        <CardDescription>
          Available balance: <span className="font-semibold text-foreground">{formatCurrency(availableBalance)}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount">Withdrawal Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="pl-8 pr-24 h-12 text-lg"
                min="10"
                max={availableBalance}
                required
              />
              <Button 
                type="button"
                variant="ghost" 
                size="sm" 
                onClick={setMaxAmount}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-primary hover:text-primary h-8"
              >
                MAX
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuickAmount(25)}
                className="text-xs"
              >
                25%
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuickAmount(50)}
                className="text-xs"
              >
                50%
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuickAmount(75)}
                className="text-xs"
              >
                75%
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuickAmount(100)}
                className="text-xs"
              >
                100%
              </Button>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <Label>Payment Method</Label>
            <div className="space-y-2">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                const isSelected = selectedMethod === method.id;
                const savedMethod = savedPaymentMethods.find(m => m.type === method.id && m.isPrimary);
                
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => {
                      setSelectedMethod(method.id);
                      setSelectedPaymentMethodId(savedMethod?.id || null);
                    }}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                      isSelected 
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary/10' : 'bg-muted'}`}>
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{method.name}</p>
                        {savedMethod && (
                          <Badge variant="outline" className="text-xs">
                            <Check className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{method.description}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground">Fee: {method.fee}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{method.time}</span>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Payment Summary */}
          {withdrawAmount && parseFloat(withdrawAmount) > 0 && (
            <div className="p-4 rounded-xl bg-muted/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Withdrawal Amount</span>
                <span className="text-sm font-medium">{formatCurrency(parseFloat(withdrawAmount))}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Processing Fee</span>
                <span className="text-sm font-medium">
                  {fee === 0 ? 'Free' : formatCurrency(fee)}
                </span>
              </div>
              <div className="border-t pt-2 flex items-center justify-between">
                <span className="text-sm font-semibold">You will receive</span>
                <span className="text-lg font-bold text-primary">{formatCurrency(netAmount)}</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button 
            type="submit"
            className="w-full h-12 text-base" 
            disabled={isProcessing || !withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > availableBalance}
          >
            {isProcessing ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Processing...
              </>
            ) : (
              <>
                Confirm Withdrawal
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By clicking confirm, you agree to our withdrawal terms and conditions
          </p>
        </form>
      </CardContent>
    </Card>
  );
};









