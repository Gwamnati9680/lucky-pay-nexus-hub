import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Wallet, 
  Shield, 
  Smartphone, 
  CreditCard, 
  TrendingUp,
  Users,
  Lock,
  CheckCircle
} from 'lucide-react';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading LuckyPay...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-primary text-primary-foreground p-4 rounded-full">
                <Wallet className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
              LuckyPay
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Your trusted financial partner for seamless money transfers, withdrawals, and digital banking solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => navigate('/auth')}
              >
                Get Started Today
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => navigate('/auth')}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose LuckyPay?</h2>
          <p className="text-xl text-muted-foreground">Experience the future of digital banking</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Mobile Banking</CardTitle>
              <CardDescription>
                Access your account anytime, anywhere with our mobile-first platform
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Instant Transfers</CardTitle>
              <CardDescription>
                Send money to any bank account in Nigeria instantly and securely
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Secure & Safe</CardTitle>
              <CardDescription>
                Bank-level security with advanced encryption to protect your money
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Track Expenses</CardTitle>
              <CardDescription>
                Monitor your spending with detailed transaction history and analytics
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>24/7 Support</CardTitle>
              <CardDescription>
                Get help whenever you need it with our round-the-clock customer support
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Account Verification</CardTitle>
              <CardDescription>
                Simple verification process to unlock all features and higher limits
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Getting Started Section */}
      <div className="bg-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started in 3 Easy Steps</h2>
            <p className="text-xl text-muted-foreground">Join thousands of satisfied customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Account</h3>
              <p className="text-muted-foreground">
                Sign up with your phone number and email to get started
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Verify Account</h3>
              <p className="text-muted-foreground">
                Pay ₦6,000 verification fee to unlock withdrawals and transfers
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Banking</h3>
              <p className="text-muted-foreground">
                Enjoy seamless banking with your ₦100,000 starting balance
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Banking Experience?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join LuckyPay today and discover the future of digital banking
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={() => navigate('/auth')}
          >
            Create Your Account Now
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary text-primary-foreground p-2 rounded-full mr-3">
              <Wallet className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold text-primary">LuckyPay</span>
          </div>
          <p className="text-muted-foreground">
            Your trusted financial partner. Banking made simple, secure, and accessible.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
