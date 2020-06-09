import React from 'react';

// 错误边界处理
export default class ErrorBoundary extends React.Component<{
  ErrorComponent?: React.ReactNode;
}, {
  hasError: boolean;
}> {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    // log error info
    console.log(error)
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({
      hasError: true,
    });
  }

  renderDefaultErrorComponent() {
    return (
      <div>default error</div>
    );
  }

  render() {
    if (this.state.hasError) {
      return this.props.ErrorComponent || this.renderDefaultErrorComponent();
    }
    return this.props.children;
  }
}
