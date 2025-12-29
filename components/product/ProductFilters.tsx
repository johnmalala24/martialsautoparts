'use client';

import { Search, Filter, X, DollarSign } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getProducts } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/formatters';

interface ProductFiltersProps {
  onFilterChange: (filters: { category: string; brand: string; search: string; priceRange?: [number, number] }) => void;
}

export default function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const allProducts = getProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  
  // Get unique categories and brands from products
  const categories = ['All', ...Array.from(new Set(allProducts.map(p => p.category)))];
  const brands = ['All', ...Array.from(new Set(allProducts.map(p => p.brand)))];
  
  // Calculate price range from products
  const minPrice = Math.min(...allProducts.map(p => p.price));
  const maxPrice = Math.max(...allProducts.map(p => p.price));
  
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);
  
  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFilterChange({ category, brand, search: value, priceRange });
  };
  
  const handleCategoryChange = (value: string) => {
    const newCategory = value === 'All' ? '' : value;
    setCategory(newCategory);
    onFilterChange({ category: newCategory, brand, search, priceRange });
  };
  
  const handleBrandChange = (value: string) => {
    const newBrand = value === 'All' ? '' : value;
    setBrand(newBrand);
    onFilterChange({ category, brand: newBrand, search, priceRange });
  };
  
  const handlePriceChange = (min: number, max: number) => {
    const newRange: [number, number] = [min, max];
    setPriceRange(newRange);
    onFilterChange({ category, brand, search, priceRange: newRange });
  };
  
  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setBrand('');
    setPriceRange([minPrice, maxPrice]);
    onFilterChange({ category: '', brand: '', search: '', priceRange: [minPrice, maxPrice] });
  };
  
  const hasActiveFilters = search || category || brand || priceRange[0] !== minPrice || priceRange[1] !== maxPrice;
  
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-red-100 rounded-lg">
            <Filter className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="font-bold text-lg text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>
      
      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Search Products</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or description..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
            />
          </div>
        </div>
        
        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <DollarSign className="w-4 h-4 inline mr-1" />
            Price Range
          </label>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={minPrice}
                max={maxPrice}
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(Number(e.target.value), priceRange[1])}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                placeholder="Min"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                min={minPrice}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(priceRange[0], Number(e.target.value))}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                placeholder="Max"
              />
            </div>
            <div className="text-xs text-gray-500 text-center">
              {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
            </div>
          </div>
        </div>
        
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
          <select
            value={category || 'All'}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white font-medium cursor-pointer transition-all"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        
        {/* Brand Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Brand</label>
          <select
            value={brand || 'All'}
            onChange={(e) => handleBrandChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white font-medium cursor-pointer transition-all"
          >
            {brands.map((br) => (
              <option key={br} value={br}>
                {br}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}