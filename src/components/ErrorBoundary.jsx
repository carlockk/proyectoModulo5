// src/components/ErrorBoundary.jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

 static getDerivedStateFromError(error) {
  console.error("Error detectado:", error);
  return { hasError: true };
}


  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#b00020' }}>
          <h2>Ocurrió un error inesperado.</h2>
          <p>Por favor, intenta recargar la página o volver más tarde.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
