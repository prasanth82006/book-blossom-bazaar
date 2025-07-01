
import React from 'react';
import { Heart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { mockBooks } from '@/data/mockBooks';
import BookCard from '@/components/BookCard';

const Wishlist = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { wishlist } = useWishlist();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
          <p className="text-muted-foreground mb-4">
            You need to be signed in to view your wishlist.
          </p>
          <Button onClick={() => navigate('/')}>
            Go to Homepage
          </Button>
        </div>
      </div>
    );
  }

  const wishlistBooks = mockBooks.filter(book => wishlist.includes(book.id));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="mb-8">
          <h1 className="font-playfair text-4xl font-bold text-foreground mb-2 flex items-center">
            <Heart className="mr-3 h-8 w-8 text-primary" />
            My Wishlist
          </h1>
          <p className="text-lg text-muted-foreground">
            Books you've saved for later
          </p>
        </div>

        {wishlistBooks.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-24 w-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Start browsing books and save the ones you're interested in!
            </p>
            <Button onClick={() => navigate('/books')} size="lg">
              Browse Books
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-muted-foreground">
                {wishlistBooks.length} book{wishlistBooks.length !== 1 ? 's' : ''} in your wishlist
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
