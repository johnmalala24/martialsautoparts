import { Product, User, Sale, DashboardStats, InventoryItem } from '@/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Brake Pads Set',
    description: 'High-performance ceramic brake pads designed for superior stopping power and reduced brake dust. Compatible with most modern vehicles.',
    shortDescription: 'Ceramic brake pads for superior stopping power',
    price: 89.99,
    category: 'Brakes',
    brand: 'Toyota',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800',
    images: [
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800'
    ],
    stockStatus: 'in_stock',
    productType: 'aftermarket',
    compatibility: ['Toyota Camry 2015-2023', 'Toyota Corolla 2014-2023'],
    specifications: {
      'Material': 'Ceramic',
      'Weight': '2.5 lbs',
      'Warranty': '2 years'
    },
    // Example AliExpress integration - replace with actual product IDs
    aliExpressProductId: '1005001234567890', // Replace with real AliExpress product ID
    aliExpressUrl: 'https://www.aliexpress.com/item/1005001234567890.html' // Optional: direct link
  },
  {
    id: '2',
    name: 'Engine Oil Filter',
    description: 'OEM quality oil filter with advanced filtration technology to protect your engine from contaminants.',
    shortDescription: 'OEM quality oil filter for engine protection',
    price: 12.99,
    category: 'Engine',
    brand: 'Honda',
    image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800',
    images: ['https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800'],
    stockStatus: 'in_stock',
    productType: 'oem',
    compatibility: ['Honda Accord 2016-2023', 'Honda Civic 2016-2023'],
    specifications: {
      'Type': 'Spin-on',
      'Micron Rating': '25',
      'Warranty': '1 year'
    },
    oemNumber: 'HON-15400-PLM-A02'
  },
  {
    id: '3',
    name: 'Spark Plugs Set (4pc)',
    description: 'Iridium spark plugs for improved fuel efficiency and engine performance. Set of 4 plugs.',
    shortDescription: 'Iridium spark plugs for better performance',
    price: 45.99,
    category: 'Engine',
    brand: 'Ford',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800',
    images: ['https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'],
    stockStatus: 'low_stock',
    productType: 'aftermarket',
    compatibility: ['Ford F-150 2015-2023', 'Ford Explorer 2016-2023'],
    specifications: {
      'Material': 'Iridium',
      'Gap': '0.044"',
      'Warranty': '3 years'
    }
  },
  {
    id: '4',
    name: 'Air Filter',
    description: 'High-flow air filter for improved engine breathing and performance.',
    shortDescription: 'High-flow air filter',
    price: 24.99,
    category: 'Engine',
    brand: 'Chevrolet',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
    images: ['https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800'],
    stockStatus: 'in_stock',
    productType: 'aftermarket',
    compatibility: ['Chevrolet Silverado 2014-2023'],
    specifications: {
      'Type': 'Panel',
      'Material': 'Cotton gauze',
      'Warranty': '1 year'
    }
  },
  {
    id: '5',
    name: 'Shock Absorbers Pair',
    description: 'Gas-charged shock absorbers for smooth ride and improved handling.',
    shortDescription: 'Gas-charged shock absorbers',
    price: 159.99,
    category: 'Suspension',
    brand: 'Nissan',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800',
    images: ['https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800'],
    stockStatus: 'in_stock',
    productType: 'oem',
    compatibility: ['Nissan Altima 2013-2023'],
    specifications: {
      'Type': 'Gas-charged',
      'Position': 'Rear',
      'Warranty': '2 years'
    },
    oemNumber: 'NIS-56210-3TA0A'
  },
  {
    id: '6',
    name: 'Battery 12V 70Ah',
    description: 'Maintenance-free car battery with excellent cold cranking performance.',
    shortDescription: 'Maintenance-free 12V battery',
    price: 129.99,
    category: 'Electrical',
    brand: 'Universal',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800',
    images: ['https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800'],
    stockStatus: 'in_stock',
    productType: 'aftermarket',
    compatibility: ['Most vehicles'],
    specifications: {
      'Voltage': '12V',
      'Capacity': '70Ah',
      'CCA': '600A',
      'Warranty': '3 years'
    }
  }
];

export const mockUsers: User[] = [
  // Admin users
  {
    id: '1',
    name: 'John Admin',
    email: 'john@martials.com',
    phone: '5551234567',
    role: 'admin',
    status: 'active',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '5',
    name: 'Alex Administrator',
    email: 'alex.admin@martials.com',
    phone: '5551234571',
    role: 'admin',
    status: 'active',
    createdAt: new Date('2024-01-20')
  },
  
  // Owner users
  {
    id: '2',
    name: 'Sarah Owner',
    email: 'sarah@martials.com',
    phone: '5551234568',
    role: 'owner',
    status: 'active',
    createdAt: new Date('2024-01-10')
  },
  {
    id: '6',
    name: 'David Business Owner',
    email: 'david.owner@martials.com',
    phone: '5551234572',
    role: 'owner',
    status: 'active',
    createdAt: new Date('2024-01-05')
  },
  
  // Manager users
  {
    id: '3',
    name: 'Mike Manager',
    email: 'mike@martials.com',
    phone: '5551234569',
    role: 'manager',
    status: 'active',
    createdAt: new Date('2024-02-01')
  },
  {
    id: '7',
    name: 'Jennifer Operations Manager',
    email: 'jennifer.manager@martials.com',
    phone: '5551234573',
    role: 'manager',
    status: 'active',
    createdAt: new Date('2024-02-10')
  },
  {
    id: '8',
    name: 'Tom Warehouse Manager',
    email: 'tom.manager@martials.com',
    phone: '5551234574',
    role: 'manager',
    status: 'active',
    createdAt: new Date('2024-02-15')
  },
  
  // Seller users
  {
    id: '4',
    name: 'Lisa Seller',
    email: 'lisa@martials.com',
    phone: '5551234570',
    role: 'seller',
    status: 'active',
    createdAt: new Date('2024-02-15')
  },
  {
    id: '9',
    name: 'Robert Sales Rep',
    email: 'robert.seller@martials.com',
    phone: '5551234575',
    role: 'seller',
    status: 'active',
    createdAt: new Date('2024-02-20')
  },
  {
    id: '10',
    name: 'Emma Sales Associate',
    email: 'emma.seller@martials.com',
    phone: '5551234576',
    role: 'seller',
    status: 'active',
    createdAt: new Date('2024-02-25')
  },
  {
    id: '11',
    name: 'James Sales Agent',
    email: 'james.seller@martials.com',
    phone: '5551234577',
    role: 'seller',
    status: 'active',
    createdAt: new Date('2024-03-01')
  },
  {
    id: '12',
    name: 'Maria Sales Consultant',
    email: 'maria.seller@martials.com',
    phone: '5551234578',
    role: 'seller',
    status: 'active',
    createdAt: new Date('2024-03-05')
  }
];

export const mockSales: Sale[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Premium Brake Pads Set',
    sellerId: '4',
    sellerName: 'Lisa Seller',
    customerName: 'Robert Johnson',
    customerPhone: '5559876543',
    customerEmail: 'robert@email.com',
    quantity: 2,
    totalAmount: 179.98,
    status: 'completed',
    createdAt: new Date('2024-03-10')
  },
  {
    id: '2',
    productId: '2',
    productName: 'Engine Oil Filter',
    sellerId: '4',
    sellerName: 'Lisa Seller',
    customerName: 'Emily Davis',
    customerPhone: '5559876544',
    customerEmail: 'emily@email.com',
    quantity: 4,
    totalAmount: 51.96,
    status: 'completed',
    createdAt: new Date('2024-03-12')
  }
];

export const mockInventory: InventoryItem[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Premium Brake Pads Set',
    quantity: 45,
    stockStatus: 'in_stock',
    lastRestocked: new Date('2024-03-01')
  },
  {
    id: '2',
    productId: '3',
    productName: 'Spark Plugs Set (4pc)',
    quantity: 8,
    stockStatus: 'low_stock',
    lastRestocked: new Date('2024-02-15')
  }
];

export const getDashboardStats = (): DashboardStats => ({
  totalSales: 1250,
  totalUsers: 48,
  totalProducts: 356,
  revenue: 125000
});

export const getProducts = (): Product[] => mockProducts;
export const getProductById = (id: string): Product | undefined => 
  mockProducts.find(p => p.id === id);
export const getUsers = (): User[] => mockUsers;
export const getSales = (): Sale[] => mockSales;
export const getInventory = (): InventoryItem[] => mockInventory;