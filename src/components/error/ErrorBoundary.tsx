import React from 'react';
import useNotFound from '../../lib/hooks/useNotFound';
import NotFoundPage from '../../pages/NotFoundPage';
import * as Sentry from '@sentry/browser';
import CrashErrorScreen from './CrashErrorScreen';
import ChunkErrorScreen from './ChunkErrorScreen';

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    chunkError: false,
  };
  static getDerivedStateFromError(error: Error) {
    if (error.name === 'ChunkLoadError') {
      return {
        chunkError: true,
      };
    }
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: any) {
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(error);
    }
  }

  handleResolveError = () => {
    this.setState({
      hasError: false,
    });
  };
  render() {
    if (this.state.chunkError) {
      return <ChunkErrorScreen />;
    }
    if (this.state.hasError) {
      return <CrashErrorScreen onResolve={this.handleResolveError} />;
    }
    return (
      <ErrorBoundaryWrapper hasError={this.state.hasError}>
        {this.props.children}
      </ErrorBoundaryWrapper>
    );
  }
}

type ErrorBoundaryWrapperProps = {
  children: React.ReactNode;
  hasError: boolean;
};
function ErrorBoundaryWrapper(props: ErrorBoundaryWrapperProps) {
  const { isNotFound } = useNotFound();

  if (isNotFound) {
    return <NotFoundPage />;
  }

  return <>{props.children}</>;
}

export default ErrorBoundary;
