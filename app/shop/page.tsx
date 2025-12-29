'use client';

import { useState, useMemo } from 'react';
import { Grid, List, SlidersHorizontal, ChevronDown } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import ProductFilters from '@/components/product/ProductFilters';
import Button from '@/components/ui/Button';
import { getProducts } from '@/lib/mock-data';

type SortOption = 'default' | 'price-low' | 'price-high' | 'name-asc' | 'name-desc';
type ViewMode = 'grid' | 'list';

export default function ShopPage() {
  const allProducts = getProducts();
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const handleFilterChange = (filters: { category: string; brand: string; search: string; priceRange?: [number, number] }) => {
    let filtered = allProducts;
    
    // Filter by category
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    
    // Filter by brand
    if (filters.brand) {
      filtered = filtered.filter(p => p.brand === filters.brand);
    }
    
    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by price range
    if (filters.priceRange) {
      filtered = filtered.filter(p => 
        p.price >= filters.priceRange![0] && p.price <= filters.priceRange![1]
      );
    }
    
    setFilteredProducts(filtered);
  };
  
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];
    
    switch (sortBy) {
      case 'price-low':
        return products.sort((a, b) => a.price - b.price);
      case 'price-high':
        return products.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return products.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return products;
    }
  }, [filteredProducts, sortBy]);
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-8 pt-28">
        <div className="container-custom">
          {/* Header Section */}
          <div className="mb-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Our Store
                </h1>
                <p className="text-gray-600 text-lg">Discover premium auto parts for your vehicle</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </Button>
              </div>
            </div>
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <span className="text-gray-600 font-medium">
                  <span className="text-gray-900 font-bold">{sortedProducts.length}</span> Products Found
                </span>
              </div>
              
              <div className="flex items-center gap-3 flex-wrap">
                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === 'grid'
                        ? 'bg-white text-red-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === 'list'
                        ? 'bg-white text-red-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Sort Dropdown */}
                <div className="relative group">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="appearance-none pl-4 pr-10 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white text-gray-900 font-medium cursor-pointer transition-all"
                  >
                    <option value="default">Default Sorting</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="sticky top-24">
                <ProductFilters onFilterChange={handleFilterChange} />
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="lg:col-span-3">
              {sortedProducts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Grid className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFilteredProducts(allProducts);
                        setSortBy('default');
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              ) : (
                <ProductGrid products={sortedProducts} viewMode={viewMode} />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}