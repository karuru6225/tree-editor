import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReadIcon from '../../../images/notification/read.svg';
import UnReadIcon from '../../../images/notification/unread.svg';
import moment from 'moment';

const Message = text => (
  <span>
    {text.split("\n").map((m, index) => {
      return (
        <span key={index}>
          {m}
          <br />
        </span>
      )
    })}
  </span>
);

const styles = theme => ({
  icon: {
    margin: theme.spacing.unit,
  },
  summary: {
    margin: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
  }
});

const DISPLAY_DATE_FORMAT = 'YYYY.MM.DD HH:mm';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler() {
    this.props.checkRead(this.props.objectId);
  }

  render() {
    const {
      classes,
      title,
      postDateTime,
      content,
      isRead,
    } = this.props;
    return (
      <React.Fragment>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={this.onClickHandler}
          >
            <div className={classes.icon} >
              <img src={isRead ? ReadIcon : UnReadIcon} />
            </div>
            <div className={classes.summary}>
              <Typography >
                {title}
              </Typography>
              <Typography>
                {moment(postDateTime).format(DISPLAY_DATE_FORMAT)}
              </Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {Message(content)}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Item);