
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    toast({
      title: "Something went wrong",
      description: "An unexpected error occurred. The team has been notified.",
      variant: "destructive",
    });
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
          <h2 className="text-2xl font-bold mb-4">Что-то пошло не так</h2>
          <p className="text-cargo-gray-600 mb-6 text-center max-w-md">
            Произошла непредвиденная ошибка. Пожалуйста, попробуйте перезагрузить страницу.
          </p>
          <div className="flex gap-4">
            <Button 
              variant="outline"
              onClick={() => window.location.reload()}
            >
              Перезагрузить страницу
            </Button>
            <Button 
              onClick={() => {
                this.setState({ hasError: false });
                window.history.back();
              }}
            >
              Вернуться назад
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
