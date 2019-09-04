import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TelIcon from '../../../images/tel.svg';
import MailIcon from '../../../images/mail.svg';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    fontFamily: theme.typography.NotoSansRegular,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    margin: '16px',
  },
  num: {
    margin: '16px auto 16px auto',
    fontFamily: theme.typography.NotoSansBold,
    fontSize: '18px',
    lineHeight: '22px',
    color: theme.palette.common.green,
    textDecoration: 'none',
  }
});


class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <div>
            <img src={TelIcon}/>
          </div>
          <div className={classes.text}>
            <div>電話でのお問合せ</div>
            <a href="tel:03-3496-3455" className={classes.num}>03-3496-3455</a>
            <div>窓口時間</div>
            <div>7:00-23:00 祝休日も対応</div>
          </div>
        </div>

        <div className={classes.container}>
          <div>
            <img src={MailIcon}/>
          </div>
          <div className={classes.text}>
            <div>メールでのお問合せ</div>
            <a href="mailto:support@research.ponta.jp" className={classes.num}>support@research.ponta.jp</a>
            <div>
              返信に2~3日のお時間を頂戴する可能性がございます。<br/>
              緊急の場合は、お電話にてお問い合わせください。
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Content);
