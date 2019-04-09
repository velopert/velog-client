import React, { Component } from 'react';
import { getScrollBottom } from '../../lib/utils';

interface ScrollingPaginationProps {
  loading: boolean;
  lastCursor: null | string;
  onLoadMore: (cursor: string) => Promise<void>;
  onPrefetch: (cursor: string) => void;
}

export default class ScrollingPagination extends Component<
  ScrollingPaginationProps,
  any
> {
  prevCursor: null | string = null;

  loadMore = () => {
    const { onLoadMore, lastCursor, loading } = this.props;
    if (!lastCursor) return;
    if (loading) return;
    if (this.prevCursor === lastCursor) return;
    console.log(lastCursor);
    onLoadMore(lastCursor);
    this.prevCursor = lastCursor;
  };

  handleScroll = () => {
    const scrollBottom = getScrollBottom();
    if (scrollBottom < 768) {
      this.loadMore();
    }
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    if (this.props.lastCursor) {
      this.props.onPrefetch(this.props.lastCursor);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps: ScrollingPaginationProps) {
    if (
      prevProps.lastCursor !== this.props.lastCursor &&
      this.props.lastCursor
    ) {
      console.log('prefetch!');
      this.props.onPrefetch(this.props.lastCursor);
    }
  }

  public render() {
    return <div />;
  }
}
