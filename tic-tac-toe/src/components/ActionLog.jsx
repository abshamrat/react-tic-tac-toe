import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const ActionLog = ({ actionLog }) => {

  return (
    <Grid 
      container 
      spacing={0}
      direction="column"
      alignItems="center"
      justify="flex-start"
      style={{ minHeight: '40vh', marginTop: 40 }}
    >
      <Grid item xs={12} sm={12} md={12} style={{minWidth: 200, marginBottom: 10, textAlign: 'center'}}>
        <div>
          <Divider />
          <Typography variant="body1">Action Logs</Typography>
          <Divider />
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        {actionLog && actionLog.map((log, key) => (
          <div key={key}>
            <Typography variant="caption">{log.logMessage}</Typography>
            <Divider light />
          </div>
        ))}
      </Grid>
    </Grid>
  );
};

const { object, arrayOf } = PropTypes;

ActionLog.propTypes = {
  actionLog: arrayOf(object),
};

export default ActionLog;