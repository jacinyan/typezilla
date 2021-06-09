import React, { Component } from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

export default class ErrorBoundary extends Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>
> {
  state = { error: null };
  //gets called when error thrown by child component and passed into state object in place of null
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
