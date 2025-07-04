import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-8 bg-red-500/10 border-red-500/30 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertTriangle className="w-10 h-10 text-red-400" />
              </motion.div>
              
              <h2 className="text-2xl font-bold text-red-300 mb-4">
                Something went wrong
              </h2>
              
              <p className="text-red-200 mb-6 text-sm">
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
              
              <Button
                onClick={this.handleRetry}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 text-lg rounded-xl flex items-center gap-2 mx-auto"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </Button>
            </motion.div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
} 