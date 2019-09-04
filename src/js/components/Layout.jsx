import "babel-polyfill";
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from '../containers/header';
import Bottom from './Bottom';

const styles = () => ({
  contentWrapper: {
    minHeight: '100vh',
    margin: 'auto',
    paddingTop: '60px',
    paddingBottom: '60px',
    width: '100%',
  }
})

class PageLayout extends React.Component {
  render() {
    const { classes, visibleBottom } = this.props;
    return (
      <React.Fragment>
        <Header title={this.props.title}/>
        <div className={classes.contentWrapper}>
          {this.props.children}
        </div>
        {
          visibleBottom ? <Bottom/> : null
        }
      </React.Fragment>
    );
  }
}

PageLayout.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired),
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  visibleBottom: PropTypes.bool.isRequired,
};

PageLayout.defaultProps = {
  visibleBottom: true,
};

export default withStyles(styles)(PageLayout);
