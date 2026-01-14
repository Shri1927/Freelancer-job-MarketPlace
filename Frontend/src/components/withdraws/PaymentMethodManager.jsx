import { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Building, 
  CreditCard, 
  Landmark, 
  Wallet,
  AlertCircle,
  Star
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const methodIcons = {
  bank: Building,
  paypal: CreditCard,
  wise: Landmark,
  wallet: Wallet,
};

const methodLabels = {
  bank: 'Bank Account',
  paypal: 'PayPal',
  wise: 'Wise',
  wallet: 'Digital Wallet',
};

export const PaymentMethodManager = ({ 
  paymentMethods = [], 
  onAdd, 
  onUpdate, 
  onDelete, 
  onSetPrimary 
}) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
  const [formData, setFormData] = useState({
    type: 'bank',
    accountName: '',
    accountNumber: '',
    routingNumber: '',
    bankName: '',
    email: '',
    swiftCode: '',
    walletAddress: '',
    isPrimary: false,
  });

  const resetForm = () => {
    setFormData({
      type: 'bank',
      accountName: '',
      accountNumber: '',
      routingNumber: '',
      bankName: '',
      email: '',
      swiftCode: '',
      walletAddress: '',
      isPrimary: false,
    });
  };

  const handleOpenAdd = () => {
    resetForm();
    setEditingMethod(null);
    setIsAddDialogOpen(true);
  };

  const handleOpenEdit = (method) => {
    setFormData({
      type: method.type,
      accountName: method.accountName || '',
      accountNumber: method.accountNumber || '',
      routingNumber: method.routingNumber || '',
      bankName: method.bankName || '',
      email: method.email || '',
      swiftCode: method.swiftCode || '',
      walletAddress: method.walletAddress || '',
      isPrimary: method.isPrimary || false,
    });
    setEditingMethod(method);
    setIsAddDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setEditingMethod(null);
    resetForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation based on method type
    if (formData.type === 'bank') {
      if (!formData.accountName || !formData.accountNumber || !formData.routingNumber || !formData.bankName) {
        toast.error('Please fill in all required bank account fields');
        return;
      }
    } else if (formData.type === 'paypal') {
      if (!formData.email) {
        toast.error('Please enter your PayPal email');
        return;
      }
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error('Please enter a valid email address');
        return;
      }
    } else if (formData.type === 'wise') {
      if (!formData.accountName || !formData.accountNumber || !formData.swiftCode) {
        toast.error('Please fill in all required Wise account fields');
        return;
      }
    } else if (formData.type === 'wallet') {
      if (!formData.walletAddress) {
        toast.error('Please enter your wallet address');
        return;
      }
    }

    const methodData = {
      ...formData,
      id: editingMethod?.id || `method-${Date.now()}`,
      isVerified: editingMethod?.isVerified || false,
      createdAt: editingMethod?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editingMethod) {
      if (onUpdate) onUpdate(methodData);
      toast.success('Payment method updated successfully');
    } else {
      if (onAdd) onAdd(methodData);
      toast.success('Payment method added successfully');
    }

    handleCloseDialog();
  };

  const handleDelete = (method) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      if (onDelete) onDelete(method.id);
      toast.success('Payment method deleted');
    }
  };

  const handleSetPrimary = (method) => {
    if (onSetPrimary) onSetPrimary(method.id);
    toast.success(`${methodLabels[method.type]} set as primary`);
  };

  const Icon = methodIcons[formData.type] || Building;

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your withdrawal payment methods
              </CardDescription>
            </div>
            <Button onClick={handleOpenAdd} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Method
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {paymentMethods.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium text-foreground mb-1">No payment methods</p>
              <p className="text-sm text-muted-foreground mb-4">
                Add a payment method to start withdrawing funds
              </p>
              <Button onClick={handleOpenAdd}>
                <Plus className="w-4 h-4 mr-2" />
                Add Payment Method
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const MethodIcon = methodIcons[method.type] || Building;
                return (
                  <div
                    key={method.id}
                    className="p-4 rounded-xl border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`p-3 rounded-lg ${method.isPrimary ? 'bg-primary/10' : 'bg-muted'}`}>
                          <MethodIcon className={`w-5 h-5 ${method.isPrimary ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-foreground">
                              {methodLabels[method.type] || method.type}
                            </p>
                            {method.isPrimary && (
                              <Badge variant="default" className="text-xs">
                                <Star className="w-3 h-3 mr-1" />
                                Primary
                              </Badge>
                            )}
                            {method.isVerified && (
                              <Badge variant="outline" className="text-xs">
                                <Check className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            {!method.isVerified && (
                              <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-600">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Pending
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            {method.type === 'bank' && (
                              <>
                                <p>{method.bankName}</p>
                                <p>****{method.accountNumber?.slice(-4) || '****'}</p>
                                <p>{method.accountName}</p>
                              </>
                            )}
                            {method.type === 'paypal' && (
                              <p>{method.email}</p>
                            )}
                            {method.type === 'wise' && (
                              <>
                                <p>{method.accountName}</p>
                                <p>****{method.accountNumber?.slice(-4) || '****'}</p>
                              </>
                            )}
                            {method.type === 'wallet' && (
                              <p className="font-mono text-xs">
                                {method.walletAddress?.slice(0, 20)}...
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!method.isPrimary && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSetPrimary(method)}
                            className="text-xs"
                          >
                            Set Primary
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenEdit(method)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(method)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingMethod ? 'Edit Payment Method' : 'Add Payment Method'}
            </DialogTitle>
            <DialogDescription>
              {editingMethod 
                ? 'Update your payment method details' 
                : 'Add a new payment method for withdrawals'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Method Type */}
            <div className="space-y-2">
              <Label>Payment Method Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
                disabled={!!editingMethod}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank">Bank Account</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="wise">Wise</SelectItem>
                  <SelectItem value="wallet">Digital Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bank Account Fields */}
            {formData.type === 'bank' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Input
                    id="bankName"
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    placeholder="Enter bank name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountName">Account Holder Name *</Label>
                  <Input
                    id="accountName"
                    value={formData.accountName}
                    onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                    placeholder="Enter account holder name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <Input
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    placeholder="Enter account number"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="routingNumber">Routing Number *</Label>
                  <Input
                    id="routingNumber"
                    value={formData.routingNumber}
                    onChange={(e) => setFormData({ ...formData, routingNumber: e.target.value })}
                    placeholder="Enter routing number"
                    required
                  />
                </div>
              </>
            )}

            {/* PayPal Fields */}
            {formData.type === 'paypal' && (
              <div className="space-y-2">
                <Label htmlFor="email">PayPal Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            )}

            {/* Wise Fields */}
            {formData.type === 'wise' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="accountName">Account Holder Name *</Label>
                  <Input
                    id="accountName"
                    value={formData.accountName}
                    onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                    placeholder="Enter account holder name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <Input
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    placeholder="Enter account number"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="swiftCode">SWIFT Code *</Label>
                  <Input
                    id="swiftCode"
                    value={formData.swiftCode}
                    onChange={(e) => setFormData({ ...formData, swiftCode: e.target.value })}
                    placeholder="Enter SWIFT code"
                    required
                  />
                </div>
              </>
            )}

            {/* Wallet Fields */}
            {formData.type === 'wallet' && (
              <div className="space-y-2">
                <Label htmlFor="walletAddress">Wallet Address *</Label>
                <Input
                  id="walletAddress"
                  value={formData.walletAddress}
                  onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                  placeholder="Enter wallet address"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Make sure to double-check the address. Transactions cannot be reversed.
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                {editingMethod ? 'Update' : 'Add'} Method
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};









