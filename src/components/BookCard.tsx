
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book } from '@/types/Book';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const inWishlist = isInWishlist(book.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to add books to your wishlist');
      return;
    }
    
    if (inWishlist) {
      removeFromWishlist(book.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(book.id);
      toast.success('Added to wishlist');
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'New':
        return 'bg-green-100 text-green-800';
      case 'Like New':
        return 'bg-blue-100 text-blue-800';
      case 'Good':
        return 'bg-yellow-100 text-yellow-800';
      case 'Fair':
        return 'bg-orange-100 text-orange-800';
      case 'Poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <Link to={`/books/${book.id}`}>
        <div className="relative">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-2 right-2 space-y-2">
            <Badge className={getConditionColor(book.condition)}>
              {book.condition}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 left-2 bg-white/80 hover:bg-white"
            onClick={handleWishlistToggle}
          >
            <Heart className={`h-4 w-4 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link to={`/books/${book.id}`}>
          <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
          <p className="text-xs text-gray-500 mb-2">{book.genre}</p>
          <p className="text-sm text-gray-700 line-clamp-2 mb-3">{book.description}</p>
        </Link>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold text-primary">${book.price}</p>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <User className="h-3 w-3 mr-1" />
            <span>{book.sellerName}</span>
          </div>
        </div>
        <Link to={`/books/${book.id}`}>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
