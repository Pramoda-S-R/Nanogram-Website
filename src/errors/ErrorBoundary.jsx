import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen flex-center flex-col gap-6">
      <div className="flex-center gap-5">
        <img
          src="/assets/images/nanogram_logo-bg-primary.svg"
          alt="Logo"
          className="w-1/6 rounded-full"
        />
        <h1 className="text-4xl font-bold text-primary nanogram mb-3">
          NANOGRAM
        </h1>
      </div>
      <div className="flex-center flex-col gap-5 px-6 text-center">
        <h2 className="text-3xl font-bold text-neutral-black">
          We're sorry, something went wrong.
        </h2>
        <p className="text-lg font-normal text-neutral-black/70">
            Please refresh the page or try again later.
        </p>
      </div>
    </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
