import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    height: 'calc(100vh - 64px)'
  },
  card: {
    width: 350,
    margin: '0 auto'
  },
  textField: {
    margin: 20,
    width: 'calc(100% - 40px )'
  },
  button: {
    margin: 10
  },
  right: {
    textAlign: 'right'
  }
};

function AuthCard(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>{props.children(classes)}</CardContent>
      </Card>
    </div>
  );
}

AuthCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AuthCard);
