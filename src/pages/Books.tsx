
import React, { useState, useMemo } from 'react';
import BookCard from '@/components/BookCard';
import BookFilter from '@/components/BookFilter';
import { mockBooks } from '@/data/mockBooks';
import { BookFilter as BookFilterType } from '@/types/Book';

const Books = () => {
  const [filters, setFilters] = useState<BookFilterType>({
    search: '',
    genre: 'All Genres',
    condition: 'All Conditions',
    minPrice: 0,
    maxPrice: 100,
    sortBy: 'newest'
  });

  const filteredBooks = useMemo(() => {
    let result = [...mockBooks];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.isbn?.toLowerCase().includes(searchTerm)
      );
    }

    // Apply genre filter
    if (filters.genre !== 'All Genres') {
      result = result.filter(book => book.genre === filters.genre);
    }

    // Apply condition filter
    if (filters.condition !== 'All Conditions') {
      result = result.filter(book => book.condition === filters.condition);
    }

    // Apply price filter
    result = result.filter(book => 
      book.price >= filters.minPrice && book.price <= filters.maxPrice
    );

    // Apply sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return result;
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-playfair text-4xl font-bold text-foreground mb-2">
            Browse Books
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover amazing books from our community of readers
          </p>
        </div>

        <BookFilter filters={filters} onFiltersChange={setFilters} />

        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''}
          </p>
        </div>

        {filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              No books found matching your criteria.
            </p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or search terms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
