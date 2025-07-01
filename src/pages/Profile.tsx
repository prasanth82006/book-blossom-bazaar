
import React from 'react';
import { User, Mail, Calendar, BookOpen, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { mockBooks } from '@/data/mockBooks';
import BookCard from '@/components/BookCard';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
            <p className="text-muted-foreground mb-4">
              You need to be signed in to view your profile.
            </p>
            <Button onClick={() => navigate('/')}>
              Go to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Mock user's listings (in real app, this would come from API)
  const userListings = mockBooks.filter(book => book.sellerId === user.id);
  const wishlistBooks = mockBooks.filter(book => wishlist.includes(book.id));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Profile Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="font-playfair text-2xl">
                    {user.name}
                  </CardTitle>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {user.email}
                    </div>
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                      {user.role === 'admin' ? 'Administrator' : 'Member'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <BookOpen className="h-8 w-8 mx-auto text-primary mb-2" />
                  <p className="text-2xl font-bold text-primary">{userListings.length}</p>
                  <p className="text-sm text-muted-foreground">Books Listed</p>
                </div>
                <div className="text-center p-4 bg-secondary/20 rounded-lg">
                  <Heart className="h-8 w-8 mx-auto text-primary mb-2" />
                  <p className="text-2xl font-bold text-primary">{wishlist.length}</p>
                  <p className="text-sm text-muted-foreground">Wishlist Items</p>
                </div>
                <div className="text-center p-4 bg-accent/20 rounded-lg">
                  <Calendar className="h-8 w-8 mx-auto text-primary mb-2" />
                  <p className="text-2xl font-bold text-primary">0</p>
                  <p className="text-sm text-muted-foreground">Transactions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* My Listings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-playfair text-xl">My Listings</CardTitle>
                <Button onClick={() => navigate('/create-listing')}>
                  Add New Listing
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {userListings.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium mb-2">No listings yet</p>
                  <p className="text-muted-foreground mb-4">
                    Start sharing your books with the community!
                  </p>
                  <Button onClick={() => navigate('/create-listing')}>
                    Create Your First Listing
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userListings.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Wishlist Preview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-playfair text-xl">Recent Wishlist</CardTitle>
                <Button variant="outline" onClick={() => navigate('/wishlist')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {wishlistBooks.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium mb-2">Your wishlist is empty</p>
                  <p className="text-muted-foreground mb-4">
                    Save books you're interested in to find them later!
                  </p>
                  <Button onClick={() => navigate('/books')}>
                    Browse Books
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistBooks.slice(0, 3).map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
