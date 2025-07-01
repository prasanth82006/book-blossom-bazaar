
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { BookFilter as BookFilterType } from '@/types/Book';

interface BookFilterProps {
  filters: BookFilterType;
  onFiltersChange: (filters: BookFilterType) => void;
}

const genres = [
  'All Genres',
  'Classic Literature',
  'Science Fiction',
  'Fantasy',
  'Romance',
  'Mystery',
  'Thriller',
  'Non-Fiction',
  'Biography',
  'History',
  'Science',
  'Technology',
  'Business',
  'Self-Help',
  'Poetry',
  'Drama'
];

const conditions = [
  'All Conditions',
  'New',
  'Like New',
  'Good',
  'Fair',
  'Poor'
];

const BookFilter: React.FC<BookFilterProps> = ({ filters, onFiltersChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleFilterChange = (key: keyof BookFilterType, value: string | number) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      genre: 'All Genres',
      condition: 'All Conditions',
      minPrice: 0,
      maxPrice: 100,
      sortBy: 'newest'
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-border mb-6 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search books by title, author, or ISBN..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Advanced Filters */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Genre Filter */}
            <div className="space-y-2">
              <Label>Genre</Label>
              <Select
                value={filters.genre}
                onValueChange={(value) => handleFilterChange('genre', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Condition Filter */}
            <div className="space-y-2">
              <Label>Condition</Label>
              <Select
                value={filters.condition}
                onValueChange={(value) => handleFilterChange('condition', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <Label>Min Price</Label>
              <Input
                type="number"
                min="0"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
                placeholder="$0"
              />
            </div>

            <div className="space-y-2">
              <Label>Max Price</Label>
              <Input
                type="number"
                min="0"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                placeholder="$100"
              />
            </div>
          </div>

          {/* Sort By */}
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Label>Sort By</Label>
              <Select
                value={filters.sortBy}
                onValueChange={(value) => handleFilterChange('sortBy', value as BookFilterType['sortBy'])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="title">Title: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default BookFilter;
