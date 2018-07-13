import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InfiniteScroll from 'react-infinite-scroller';

import Screenshot from '../Screenshot';

const styles = theme => ({
  infiniteLoader: {
    textAlign: 'center'
  },
});

class InfiniteLoaderScreenshot extends React.Component {
  state = {
    viewedItems: [],
    hasMoreItems: false,
  };

  componentWillMount() {
    this.loadItems();
  }

  loadItems() {
    const { items } = this.props;
    const { viewedItems } = this.state;
    const currentLength = viewedItems.length;

    if (items.length === viewedItems.length) {
      this.setState({ hasMoreItems: false });
      return null;
    } else {
      const newItems = items.slice(currentLength, currentLength + 5)
      this.setState({viewedItems: this.state.viewedItems.concat(newItems)})
      this.setState({ hasMoreItems: true });
      return viewedItems;
    }
  }

  render() {
    const { classes } = this.props;
    const { viewedItems } = this.state;
    const loader = <div className="loader">Loading ...</div>;

    var items = [];
    viewedItems.map((item, index) => {
        return items.push(
          <Screenshot key={index} screenshot={item} />
        );
    });

    return (
      <div className={classes.infiniteLoader}>
        <InfiniteScroll
        pageStart={0}
        loadMore={this.loadItems.bind(this)}
        hasMore={this.state.hasMoreItems}
        loader={loader}>

          <div className="items">
            {items}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

InfiniteLoaderScreenshot.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array
};

export default withStyles(styles)(InfiniteLoaderScreenshot);