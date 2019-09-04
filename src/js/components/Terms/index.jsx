import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Text from '../Agreement/text';
import PageLayout from '../Layout';
const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    textAlign: 'center',
    fontFamily: theme.typography.Helvetica,
    letterSpacing: 0,
  },
  header: {
    backgroundColor: '#FFF',
    textAlign: 'center',
    height: '56px',
    lineHeight: '56px'
  },
  textContainer: {
    maxHeight: 'calc(100% - 112px)',
  },
});

class Agreement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    }
  }

  agreeHandler() {
    localStorage.setItem('agreement', true);
    this.props.history.push('/login');
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <PageLayout title='利用規約'>
          <div className={classes.root}>
            <div className={classes.textContainer}>
              <Text page='terms' />
            </div>
          </div>
        </PageLayout>
      </React.Fragment>
        )
      }
    }
    
Agreement.propTypes = {
          classes: PropTypes.objectOf(PropTypes.string.isRequired),
      };
      
export default withStyles(styles)(Agreement);