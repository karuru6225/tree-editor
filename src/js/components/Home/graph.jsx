import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { theme } from '../../theme';
import { makeStyles } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import UserData from '../../utility/UserData';
import Plug from '../../../images/plug.svg';
import { RANK_TYPE_VALUES } from 'common/model/User';
import { VEHICLE_MODEL_VALUES } from 'common/dto/VehicleModel';

const styles = theme => ({
  plugIcon: {
    marginRight: '4px'
  },
  statusRanking: {
    display: 'flex',
    height: '64px',
  },
  statusContainer: {
    display: 'flex',
    width: '50%',
    height: '64px',
    borderRadius: '0px 0px 0px 8px',
    background: '#f5f5f5'
  },
  ranking: {
    display: 'flex',
    padding: '18px 20px 24px 23px',
  },
  rankingNumber: {
    marginLeft: '8px',
    fontFamily: theme.typography.HiraginoSans,
    fontSize: '18px',
    lineHeight: '18px',
  },
  rankingText: {
    fontSize: '12px',
    marginTop: '2px'
  },
  rankingContainer: {
    display: 'flex',
    width: '50%',
    height: '64px',
    borderRadius: '0px 0px 8px 0px',
    background: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusIcon: {
    display: 'flex',
    margin: '8px 9.4px 9.4px 23px',
  },
  graphContainer: {
    position: 'relative',
    margin: '8px auto',
    width: '247px',
    background: 'transparent'
  },
  carIcon: {
    overflow: 'hidden',
    width: '150px',
    height: '100px',
    marginTop: '-10px',
  },
  totalPointLabelContainer: {
    display: 'flex',
    height: '26.5px',
    lineHeight: '26.5px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  totalPointLabel: {
    color: '#4D4D4D',
    fontFamily: theme.typography.NotoSansRegular,
    fontSize: '16px',
    textAlign: 'left',
  },
  totalPoint: {
    margin: 'auto',
    width: '150px',
    height: '60px',
    textAlign: 'center'
  },
  totalPointNumber: {
    marginTop: 0,
    color: '#4D4D4D',
    fontSize: '60px',
    fontFamily: theme.typography.NotoSansBold,
    letterSpacing: '-0.03em',
    lineHeight: '60px',
    textAlign: 'right',
    fontWeight: 'normal',
  },
  totalPointText: {
    color: '#4D4D4D',
    fontSize: '32px'
  },
  availablePointsLabel: {
    color: '#4D4D4D',
  },
  availablePoints: {
    margin: '16px auto',
    height: '48px',
    width: '100%',
    textAlign: 'center',
    fontFamily: theme.typography.Helvetica,
    fontSize: '15px',
    lineHeight: '48px',
    color: '#E65C73',
    border: '2px solid #184FF3',
    borderRadius: '24px',
    backgroundColor: '#FFFFFF',
    letterSpacing: 0,
  },
  vehicleIcon: {
    height: '72px',
    width: '164px',
  },
  myCarSetting: {
    marginTop: theme.spacing.unit * 2,
    fontSize: '16px',
  }
});

function Circle(props) {
  const useStyles = () => {
    const { progress } = props;
    let animationStyle;
    const progressDegree = 360 * progress;

    if (progressDegree <= 180) {
      animationStyle = {
        right: {
          '0%': {
            transform: 'rotate(0deg)',
            background: '#e6e6e6'
          },
          '50%': {
            transform: 'rotate(0deg)',
            background: '#e6e6e6'
          },
          '100%': {
            transform: `rotate(${progressDegree}deg)`,
            background: '#e6e6e6'
          }
        },
        left: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '50%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(0deg)',
          },
        }
      }
    } else {
      animationStyle = {
        right: {
          '0%': {
            transform: 'rotate(0deg)',
            background: '#e6e6e6'
          },
          '50%': {
            transform: 'rotate(0deg)',
            background: '#e6e6e6'
          },
          '75%': {
            transform: 'rotate(180deg)',
            background: '#e6e6e6'
          },
          '75.01%': {
            transform: 'rotate(360deg)',
            background: '#f2ce49'
          },
          '100%': {
            transform: 'rotate(360deg)',
            background: '#f2ce49'
          }
        },
        left: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '75%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: `rotate(${(progressDegree - 180)}deg)`,
          },
        }
      }
    }


    const circleStyle = () => ({
      circle: {
        position: 'relative',
        width: '247px',
        height: '247px',
        borderRadius: '50%',
        background: '#f2ce49',
        texAlign: 'center',
        overflow: 'hidden',
        zIndex: 1,
        "&::before": {
          content: "''",
          display: 'block',
          position: 'absolute',
          top: '0px',
          left: '-123.5px',
          width: '247px',
          height: '247px',
          background: '#e6e6e6',
          transformOrigin: 'right 123.5px',
          zIndex: 2,
          animation: 'rotate-circle-left 3s linear forwards',
          animationName: '$rotate-circle-left'
        },
        "&::after": {
          content: "''",
          display: 'block',
          position: 'absolute',
          top: '0px',
          left: '123.5px',
          width: '247px',
          height: '247px',
          background: '#e6e6e6',
          transformOrigin: 'left 123.5px',
          zIndex: 3,
          animation: 'rotate-circle-right 3s linear forwards',
          animationName: '$rotate-circle-right'
        },
      },
      circleInner: {
        position: 'absolute',
        top: '8px',
        left: '8px',
        width: '229px',
        height: '229px',
        background: '#fff',
        borderRadius: '50%',
        zIndex: 4,
        textAlign: 'center',
        paddingTop: '31.5px'
      },
      "@keyframes rotate-circle-right": animationStyle.right,
      "@keyframes rotate-circle-left": animationStyle.left
    });

    return makeStyles(circleStyle);
  }

  const classes = useStyles()();
  const { children } = props;
  return (
    <div className={classes.circle}>
      <div className={classes.circleInner}>
        {children}
      </div>
    </div>
  );

}

function ProgressPointer(props) {
  const useStyles = () => {
    const { progress } = props;
    const progressDegree = 360 * progress;
    const progressRadian = progressDegree * (Math.PI / 180);

    // 外側の円のprogressに対応する場所
    const outerCircleRadius = 123.5;
    const miniCircleOuterCenterTop = outerCircleRadius - (Math.cos(progressRadian) * outerCircleRadius);
    const miniCircleOuterCenterLeft = outerCircleRadius + Math.sin(progressRadian) * outerCircleRadius;

    // 内側の円のprogressに対応する場所 外側の円より半径の差分ズレがあるため補正
    const innerCircleRadius = 114.5;
    const innerCircleBaseDiff = outerCircleRadius - innerCircleRadius;
    const miniCircleInnerCenterTop = innerCircleBaseDiff + innerCircleRadius - (Math.cos(progressRadian) * innerCircleRadius);
    const miniCircleInnerCenterLeft = innerCircleBaseDiff + innerCircleRadius + Math.sin(progressRadian) * innerCircleRadius;

    // miniCircle の中心点は外側と内側の平均。そこからminiCircleの半径分ずらす
    const miniCircleRadius = 8;
    const miniCircleTop = (miniCircleOuterCenterTop + miniCircleInnerCenterTop) / 2 - miniCircleRadius;
    const miniCircleLeft = (miniCircleOuterCenterLeft + miniCircleInnerCenterLeft) / 2 - miniCircleRadius;

    const nextRankStyle = theme => ({
      miniCircle: {
        position: 'absolute',
        top: `${miniCircleTop}px`,
        left: `${miniCircleLeft}px`,
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        background: theme.palette.common.yellow,
        zIndex: 5,
        overflow: 'visible',
        animation: 'fadein 3.5s linear forwards',
        animationName: '$fadein'
      },
      "@keyframes fadein": {
        '0%': {
          opacity: '0',
        },
        '80%': {
          opacity: '0',
        },
        '80.1%': {
          opacity: '0.1',
        },
        '100%': {
          opacity: '1',
        },
      }
    });

    return makeStyles(nextRankStyle, { defaultTheme: theme });
  }

  const classes = useStyles()();
  const { user } = props;
  const { rankType } = user;
  const currentRank = RANK_TYPE_VALUES.find((v) => v.value === rankType);
  // ステータス最大値なら非表示
  const isMaxRank = currentRank === RANK_TYPE_VALUES[RANK_TYPE_VALUES.length - 1];
  if (isMaxRank) {
    return null;
  }
  return (
    <div className={classes.miniCircle}>
    </div>
  );

}

class Graph extends React.Component {
  getVihicleIcon(vehicleModelId) {
    return (vehicleModelId) ?
      VEHICLE_MODEL_VALUES.find((v) => v.objectId === vehicleModelId).icon : null;
  }

  render() {
    const { classes, user, progress } = this.props;
    const { totalPoint, currentPoint, rankType, ranking, vehicleModelId } = this.props.user;
    const vehicleIcon = this.getVihicleIcon(vehicleModelId);

    return (
      <div className={classes.graphContainer}>
        <Circle progress={progress}>
          <div className={classes.totalPointLabelContainer}>
            <img className={classes.plugIcon} src={Plug}/>
            <div className={classes.totalPointLabel}>
              e-ポイント累計
            </div>
          </div>
          <div className={classes.totalPoint}>
            <span className={classes.totalPointNumber}>{totalPoint}</span>
            <span className={classes.totalPointText}>P</span>
          </div>
          {vehicleIcon ? <img className={classes.vehicleIcon} src={vehicleIcon}/> :
            <Button
              color='secondary'
              component={Link}
              to='/mycar'
              className={classes.myCarSetting}
            >
              マイカーを登録する
            </Button>
          }
        </Circle>
        <ProgressPointer user={user} progress={progress}/>

        <Fab
          className={classes.availablePoints}
          variant='extended'
          component={Link}
          to='/points'
        >
          <span className={classes.availablePointsLabel}>交換可能ポイント</span> {currentPoint}p
        </Fab>
      </div>
    );
  }
}

Graph.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired),
  user: PropTypes.instanceOf(UserData),
  progress: PropTypes.number
};

export default withStyles(styles)(Graph);
