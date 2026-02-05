import { useState, useMemo } from 'react';
import { subDays } from 'date-fns';
import { parseISO } from 'date-fns';
import { filterTransactionsByPeriod } from '@/data/mockEarningsData';
import { TransactionStatsCard } from '@/components/transactions/TransactionStatsCard';
import { TransactionFilters } from '@/components/transactions/TransactionFilters';
import { TransactionTable } from '@/components/transactions/TransactionTable';
import { TransactionDetailsModal } from '@/components/transactions/TransactionDetailsModal';
import { toast } from 'sonner';

// Mock data - Replace with API calls
const mockEarnings = [
  {
    id: '1',
    date: new Date().toISOString().split('T')[0],
    clientName: 'TechCorp Inc.',
    projectName: 'E-commerce Platform Redesign',
    type: 'fixed',
    amount: 2500.00,
    status: 'cleared',
    invoiceNumber: 'INV-2026-001',
  },
  {
    id: '2',
    date: subDays(new Date(), 2).toISOString().split('T')[0],
    clientName: 'StartupXYZ',
    projectName: 'Mobile App Development',
    type: 'hourly',
    amount: 1200.00,
    status: 'pending',
    invoiceNumber: 'INV-2026-002',
    hoursWorked: 16,
    hourlyRate: 75,
  },
  {
    id: '3',
    date: subDays(new Date(), 4).toISOString().split('T')[0],
    clientName: 'DesignHub',
    projectName: 'Brand Identity Package',
    type: 'fixed',
    amount: 850.00,
    status: 'cleared',
    invoiceNumber: 'INV-2025-089',
  },
  {
    id: '4',
    date: subDays(new Date(), 10).toISOString().split('T')[0],
    clientName: 'TechCorp Inc.',
    projectName: 'Dashboard Analytics Module',
    type: 'hourly',
    amount: 1875.00,
    status: 'cleared',
    invoiceNumber: 'INV-2025-088',
    hoursWorked: 25,
    hourlyRate: 75,
  },
];

const mockWithdrawals = [
  {
    id: 'wd-1',
    date: subDays(new Date(), 5).toISOString().split('T')[0],
    description: 'Bank Transfer',
    type: 'withdrawal',
    amount: -1500.00,
    status: 'completed',
    method: 'bank',
  },
  {
    id: 'wd-2',
    date: subDays(new Date(), 12).toISOString().split('T')[0],
    description: 'PayPal Withdrawal',
    type: 'withdrawal',
    amount: -800.00,
    status: 'completed',
    method: 'paypal',
  },
  {
    id: 'wd-3',
    date: subDays(new Date(), 20).toISOString().split('T')[0],
    description: 'Bank Transfer',
    type: 'withdrawal',
    amount: -2000.00,
    status: 'processing',
    method: 'bank',
  },
  {
    id: 'wd-4',
    date: subDays(new Date(), 25).toISOString().split('T')[0],
    description: 'Digital Wallet',
    type: 'withdrawal',
    amount: -600.00,
    status: 'completed',
    method: 'wallet',
  },
];

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Combine earnings and withdrawals
  const allTransactions = useMemo(() => {
    return [...mockEarnings, ...mockWithdrawals].sort((a, b) => {
      const dateA = new Date(a.date || a.createdAt);
      const dateB = new Date(b.date || b.createdAt);
      return dateB - dateA; // Sort by newest first
    });
  }, []);

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    let filtered = allTransactions;

    // Filter by time (use existing filter function for consistency)
    if (timeFilter !== 'all') {
      // Normalize transaction dates for the filter function
      const normalizedTransactions = filtered.map((tx) => ({
        ...tx,
        date: tx.date || tx.createdAt || new Date().toISOString().split('T')[0],
      }));
      
      // Handle 'today' case separately as the filter function doesn't support it
      if (timeFilter === 'today') {
        const today = new Date().toISOString().split('T')[0];
        filtered = normalizedTransactions.filter((tx) => tx.date === today);
      } else {
        filtered = filterTransactionsByPeriod(normalizedTransactions, timeFilter);
      }
    }

    // Filter by type
    if (typeFilter !== 'all') {
      if (typeFilter === 'earning') {
        filtered = filtered.filter((tx) => tx.type !== 'withdrawal' && tx.amount >= 0);
      } else if (typeFilter === 'withdrawal') {
        filtered = filtered.filter((tx) => tx.type === 'withdrawal' || tx.amount < 0);
      } else {
        filtered = filtered.filter((tx) => tx.type === typeFilter);
      }
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((tx) => tx.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((tx) => {
        const description = (tx.description || tx.projectName || tx.projectTitle || '').toLowerCase();
        const clientName = (tx.clientName || '').toLowerCase();
        const invoiceNumber = (tx.invoiceNumber || '').toLowerCase();
        return description.includes(query) || 
               clientName.includes(query) || 
               invoiceNumber.includes(query);
      });
    }

    return filtered;
  }, [allTransactions, searchQuery, typeFilter, statusFilter, timeFilter]);

  // Calculate statistics
  const stats = useMemo(() => {
    const earnings = filteredTransactions.filter((tx) => tx.type !== 'withdrawal' && tx.amount >= 0);
    const withdrawals = filteredTransactions.filter((tx) => tx.type === 'withdrawal' || tx.amount < 0);

    const totalEarnings = earnings.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    const totalWithdrawals = withdrawals.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    const availableBalance = totalEarnings - totalWithdrawals;

    return {
      totalEarnings,
      totalWithdrawals,
      availableBalance,
    };
  }, [filteredTransactions]);

  const handleExport = (format) => {
    toast.success(`Exporting ${filteredTransactions.length} transactions as ${format}`, {
      description: 'Your download will start shortly.',
    });
  };

  const handleDownloadInvoice = (transaction) => {
    toast.success('Invoice downloaded', {
      description: `Invoice ${transaction.invoiceNumber || transaction.id} is being downloaded.`,
    });
    setSelectedTransaction(null);
  };

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  return (
    <div className=" bg-gray-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Transactions
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            View all your financial transactions and track your earnings
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="mb-6 md:mb-8">
          <TransactionStatsCard
            totalEarnings={stats.totalEarnings}
            totalWithdrawals={stats.totalWithdrawals}
            availableBalance={stats.availableBalance}
            period={timeFilter === 'all' ? 'All Time' : timeFilter}
          />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <TransactionFilters
            searchQuery={searchQuery}
            typeFilter={typeFilter}
            statusFilter={statusFilter}
            timeFilter={timeFilter}
            onSearchChange={setSearchQuery}
            onTypeFilterChange={setTypeFilter}
            onStatusFilterChange={setStatusFilter}
            onTimeFilterChange={setTimeFilter}
            onExport={handleExport}
            totalTransactions={filteredTransactions.length}
          />
        </div>

        {/* Transactions Table */}
        <TransactionTable
          transactions={filteredTransactions}
          onTransactionClick={handleTransactionClick}
          emptyMessage={
            searchQuery || typeFilter !== 'all' || statusFilter !== 'all' || timeFilter !== 'all'
              ? 'Try adjusting your filters to see more results'
              : 'No transactions found'
          }
        />

        {/* Transaction Details Modal */}
        <TransactionDetailsModal
          transaction={selectedTransaction}
          isOpen={!!selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          onDownloadInvoice={handleDownloadInvoice}
        />
      </div>
    </div>
  );
};

export default Transactions;










