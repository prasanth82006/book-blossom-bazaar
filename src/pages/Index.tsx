
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Heart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BookCard from '@/components/BookCard';
import { mockBooks } from '@/data/mockBooks';

const Index = () => {
  const featuredBooks = mockBooks.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-foreground mb-6">
              Your Local
              <span className="text-primary block mt-2">Book Exchange</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Buy, sell, and discover amazing books from fellow readers in your community. 
              Find your next favorite read at unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/books">
                <Button size="lg" className="bg-primary hover:bg-primary/90 px-8">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Books
                </Button>
              </Link>
              <Link to="/create-listing">
                <Button size="lg" variant="outline" className="px-8">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Sell Your Books
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-4">
              Why Choose Book Bazaar?
            </h2>
            <p className="text-lg text-muted-foreground">
              The easiest way to find and share books in your local community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
              <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Easy Discovery</h3>
              <p className="text-muted-foreground">
                Search through thousands of books by title, author, genre, or condition. 
                Find exactly what you're looking for.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors">
              <div className="bg-secondary/40 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Save Favorites</h3>
              <p className="text-muted-foreground">
                Create your wishlist and get notified when your favorite books 
                become available at great prices.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors">
              <div className="bg-accent/40 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Local Community</h3>
              <p className="text-muted-foreground">
                Connect with fellow book lovers in your area. Safe, local exchanges 
                with trusted community members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-playfair text-3xl font-bold text-foreground mb-2">
                Featured Books
              </h2>
              <p className="text-muted-foreground">
                Discover the latest additions to our marketplace
              </p>
            </div>
            <Link to="/books">
              <Button variant="outline">
                View All Books
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-3xl font-bold text-white mb-4">
            Ready to Start Your Book Journey?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join thousands of book lovers who are already buying, selling, and discovering 
            amazing reads on Book Bazaar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/books">
              <Button size="lg" variant="secondary" className="px-8">
                Start Browsing
              </Button>
            </Link>
            <Link to="/create-listing">
              <Button size="lg" variant="outline" className="px-8 bg-transparent border-white text-white hover:bg-white hover:text-primary">
                List Your First Book
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
