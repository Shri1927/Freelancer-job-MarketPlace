import { 
  subDays, 
  subMonths, 
  startOfWeek, 
  endOfWeek, 
  startOfMonth, 
  endOfMonth, 
  startOfYear,
  isWithinInterval,
  parseISO
} from 'date-fns';

const today = new Date();

// Helper to format date as YYYY-MM-DD
const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

export const transactions = [
  // This week
  {
    id: '1',
    date: formatDate(subDays(today, 1)),
    clientName: 'TechCorp Inc.',
    projectName: 'E-commerce Platform Redesign',
    type: 'fixed',
    amount: 2500.00,
    status: 'cleared',
    invoiceNumber: 'INV-2026-001',
  },
  {
    id: '2',
    date: formatDate(subDays(today, 2)),
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
    date: formatDate(subDays(today, 4)),
    clientName: 'DesignHub',
    projectName: 'Brand Identity Package',
    type: 'fixed',
    amount: 850.00,
    status: 'cleared',
    invoiceNumber: 'INV-2025-089',
  },
  // This month (but not this week)
  {
    id: '4',
    date: formatDate(subDays(today, 10)),
    clientName: 'TechCorp Inc.',
    projectName: 'Dashboard Analytics Module',
    type: 'hourly',
    amount: 1875.00,
    status: 'cleared',
    invoiceNumber: 'INV-2025-088',
    hoursWorked: 25,
    hourlyRate: 75,
  },
  {
    id: '5',
    date: formatDate(subDays(today, 15)),
    clientName: 'GlobalRetail',
    projectName: 'Inventory Management System',
    type: 'fixed',
    amount: 3200.00,
    status: 'withdrawn',
    invoiceNumber: 'INV-2025-087',
  },
  {
    id: '6',
    date: formatDate(subDays(today, 20)),
    clientName: 'FinanceApp',
    projectName: 'Payment Gateway Integration',
    type: 'fixed',
    amount: 1500.00,
    status: 'on_hold',
    invoiceNumber: 'INV-2025-086',
  },
  // Last month
  {
    id: '7',
    date: formatDate(subMonths(today, 1)),
    clientName: 'StartupXYZ',
    projectName: 'API Development',
    type: 'hourly',
    amount: 900.00,
    status: 'cleared',
    invoiceNumber: 'INV-2025-085',
    hoursWorked: 12,
    hourlyRate: 75,
  },
  {
    id: '8',
    date: formatDate(subDays(subMonths(today, 1), 5)),
    clientName: 'MediaGroup',
    projectName: 'Content Management System',
    type: 'fixed',
    amount: 2800.00,
    status: 'withdrawn',
    invoiceNumber: 'INV-2025-084',
  },
  {
    id: '9',
    date: formatDate(subDays(subMonths(today, 1), 10)),
    clientName: 'TechCorp Inc.',
    projectName: 'Performance Optimization',
    type: 'bonus',
    amount: 500.00,
    status: 'cleared',
    invoiceNumber: 'INV-2025-083',
  },
  {
    id: '10',
    date: formatDate(subDays(subMonths(today, 1), 15)),
    clientName: 'HealthTech',
    projectName: 'Patient Portal UI',
    type: 'fixed',
    amount: 1950.00,
    status: 'cleared',
    invoiceNumber: 'INV-2025-082',
  },
  // 2 months ago
  {
    id: '11',
    date: formatDate(subMonths(today, 2)),
    clientName: 'EduLearn',
    projectName: 'LMS Platform',
    type: 'fixed',
    amount: 4500.00,
    status: 'withdrawn',
    invoiceNumber: 'INV-2025-075',
  },
  {
    id: '12',
    date: formatDate(subDays(subMonths(today, 2), 10)),
    clientName: 'RetailMax',
    projectName: 'POS System Integration',
    type: 'hourly',
    amount: 2250.00,
    status: 'withdrawn',
    invoiceNumber: 'INV-2025-070',
    hoursWorked: 30,
    hourlyRate: 75,
  },
  // 3 months ago
  {
    id: '13',
    date: formatDate(subMonths(today, 3)),
    clientName: 'TravelBuddy',
    projectName: 'Booking Engine',
    type: 'fixed',
    amount: 5200.00,
    status: 'withdrawn',
    invoiceNumber: 'INV-2025-060',
  },
  // 6 months ago
  {
    id: '14',
    date: formatDate(subMonths(today, 6)),
    clientName: 'FoodDelivery',
    projectName: 'Driver App',
    type: 'fixed',
    amount: 3800.00,
    status: 'withdrawn',
    invoiceNumber: 'INV-2025-030',
  },
  // 9 months ago
  {
    id: '15',
    date: formatDate(subMonths(today, 9)),
    clientName: 'SocialConnect',
    projectName: 'Community Platform',
    type: 'fixed',
    amount: 6500.00,
    status: 'withdrawn',
    invoiceNumber: 'INV-2024-095',
  },
];

export const earningsStats = {
  totalEarnings: 48750.00,
  availableBalance: 2850.00,
  pendingClearance: 1200.00,
  thisMonthEarnings: 11125.00,
  lastMonthEarnings: 6150.00,
  averageHourlyRate: 75.00,
  inProgress: 3500.00,
};

export const paymentPipeline = [
  {
    id: '1',
    projectName: 'Mobile App Development',
    clientName: 'StartupXYZ',
    amount: 1200.00,
    stage: 'client_review',
    daysRemaining: 2,
    expectedDate: formatDate(subDays(today, -2)),
  },
  {
    id: '2',
    projectName: 'Website Optimization',
    clientName: 'MediaGroup',
    amount: 800.00,
    stage: 'processing',
    daysRemaining: 4,
    expectedDate: formatDate(subDays(today, -4)),
  },
  {
    id: '3',
    projectName: 'E-commerce Platform Redesign',
    clientName: 'TechCorp Inc.',
    amount: 2500.00,
    stage: 'available',
    expectedDate: formatDate(today),
  },
  {
    id: '4',
    projectName: 'Dashboard Redesign',
    clientName: 'FinanceApp',
    amount: 1800.00,
    stage: 'completed',
    daysRemaining: 7,
    expectedDate: formatDate(subDays(today, -7)),
  },
];

export const monthlyEarnings = [
  { month: 'Jul', earnings: 5800, projects: 3 },
  { month: 'Aug', earnings: 6500, projects: 4 },
  { month: 'Sep', earnings: 7200, projects: 5 },
  { month: 'Oct', earnings: 5200, projects: 3 },
  { month: 'Nov', earnings: 6750, projects: 4 },
  { month: 'Dec', earnings: 6150, projects: 5 },
  { month: 'Jan', earnings: 11125, projects: 6 },
];

export const clientEarnings = [
  { clientName: 'TechCorp Inc.', totalEarnings: 12500, projectCount: 8, percentage: 26 },
  { clientName: 'StartupXYZ', totalEarnings: 8200, projectCount: 6, percentage: 17 },
  { clientName: 'MediaGroup', totalEarnings: 5800, projectCount: 4, percentage: 12 },
  { clientName: 'DesignHub', totalEarnings: 4200, projectCount: 5, percentage: 9 },
  { clientName: 'Others', totalEarnings: 18050, projectCount: 12, percentage: 36 },
];

export const goals = [
  {
    id: '1',
    title: 'Monthly Goal',
    targetAmount: 10000,
    currentAmount: 11125,
    type: 'monthly',
    deadline: '2026-01-31',
  },
  {
    id: '2',
    title: 'Q1 2026 Goal',
    targetAmount: 25000,
    currentAmount: 11125,
    type: 'quarterly',
    deadline: '2026-03-31',
  },
];

export const insights = [
  {
    id: '1',
    type: 'achievement',
    message: 'Amazing! You\'ve exceeded your monthly goal by 11%. Keep up the momentum!',
    icon: '🎯',
  },
  {
    id: '2',
    type: 'tip',
    message: 'Fixed-price projects are earning you 28% more. Consider focusing on these.',
    icon: '💡',
  },
  {
    id: '3',
    type: 'info',
    message: 'TechCorp Inc. is your top client with 26% of total earnings.',
    icon: '⭐',
  },
];

// Utility functions for filtering
export const getDateRangeForFilter = (filter) => {
  const now = new Date();
  
  switch (filter) {
    case 'this_week':
      return {
        start: startOfWeek(now, { weekStartsOn: 1 }),
        end: endOfWeek(now, { weekStartsOn: 1 }),
      };
    case 'this_month':
      return {
        start: startOfMonth(now),
        end: endOfMonth(now),
      };
    case 'last_month':
      const lastMonth = subMonths(now, 1);
      return {
        start: startOfMonth(lastMonth),
        end: endOfMonth(lastMonth),
      };
    case 'last_3_months':
      return {
        start: startOfMonth(subMonths(now, 2)),
        end: endOfMonth(now),
      };
    case 'this_year':
      return {
        start: startOfYear(now),
        end: now,
      };
    default:
      return {
        start: startOfMonth(now),
        end: endOfMonth(now),
      };
  }
};

export const filterTransactionsByPeriod = (
  allTransactions,
  filter
) => {
  const { start, end } = getDateRangeForFilter(filter);
  
  return allTransactions.filter((tx) => {
    const txDate = parseISO(tx.date);
    return isWithinInterval(txDate, { start, end });
  });
};

export const calculateEarningsForPeriod = (
  allTransactions,
  filter
) => {
  const filtered = filterTransactionsByPeriod(allTransactions, filter);
  return filtered.reduce((sum, tx) => sum + tx.amount, 0);
};

export const getFilteredStats = (filter) => {
  const filtered = filterTransactionsByPeriod(transactions, filter);
  const periodEarnings = filtered.reduce((sum, tx) => sum + tx.amount, 0);
  
  return {
    periodEarnings,
    transactionCount: filtered.length,
    avgTransaction: filtered.length > 0 ? periodEarnings / filtered.length : 0,
  };
};

