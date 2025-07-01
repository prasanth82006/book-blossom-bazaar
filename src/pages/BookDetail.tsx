
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Mail, User, Calendar, BookOpen, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { mockBooks } from '@/data/mockBooks';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const book = mockBooks.find(b => b.id === id);
  
  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Book not found</h1>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(book.id);

  const handleWishlistToggle = () => {
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

  const handleContactSeller = () => {
    if (!user) {
      toast.error('Please sign in to contact sellers');
      return;
    }
    toast.success('Message sent to seller! (Demo mode)');
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Books
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Book Image */}
          <div className="space-y-4">
            <img
              src={book.image}
              alt={book.title}
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Book Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="font-playfair text-3xl font-bold text-foreground mb-2">
                    {book.title}
                  </h1>
                  <p className="text-xl text-muted-foreground mb-2">
                    by {book.author}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">{book.genre}</Badge>
                    <Badge className={getConditionColor(book.condition)}>
                      {book.condition}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleWishlistToggle}
                >
                  <Heart className={`h-4 w-4 mr-2 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                  {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </Button>
              </div>
              
              <p className="text-4xl font-bold text-primary mb-6">
                ${book.price}
              </p>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {book.description}
              </p>
            </div>

            {/* Book Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Book Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {book.isbn && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ISBN:</span>
                    <span className="font-medium">{book.isbn}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Language:</span>
                  <span className="font-medium flex items-center">
                    <Globe className="mr-1 h-4 w-4" />
                    {book.language}
                  </span>
                </div>
                {book.pages && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pages:</span>
                    <span className="font-medium">{book.pages}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Listed:</span>
                  <span className="font-medium flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {new Date(book.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Seller Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Seller Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{book.sellerName}</p>
                    <p className="text-sm text-muted-foreground">{book.sellerEmail}</p>
                  </div>
                  <Button onClick={handleContactSeller}>
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Seller
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
