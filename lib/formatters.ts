// Date formatters
export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (date: Date | string): string => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Currency formatter - Default to Kenyan Shilling (KES)
export const formatCurrency = (amount: number, currency: string = 'KES'): string => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

// Phone formatter
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

// Stock status formatter
export const getStockStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    'in_stock': 'In Stock',
    'low_stock': 'Low Stock',
    'out_of_stock': 'Out of Stock'
  };
  return labels[status] || status;
};

// Product type formatter
export const getProductTypeLabel = (type: string): string => {
  return type === 'oem' ? 'OEM' : 'Aftermarket';
};