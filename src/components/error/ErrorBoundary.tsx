import React from 'react';
import useNotFound from '../../lib/hooks/useNotFound';
import NotFoundPage from '../../pages/NotFoundPage';

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: any) {
    console.log({
      error,
      errorInfo,
      stringifiedError: JSON.stringify(error || {}),
    });
  }
  render() {
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
