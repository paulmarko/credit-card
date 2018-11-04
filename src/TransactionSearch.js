import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  inputMargin: {
      margin: theme.spacing.unit,
  },
});

class TransactionSearch extends React.Component {
    render() {
      const {classes, onChangeSearch, setSearchOn, searchOn, searchVal} = this.props;
      return(
        <div>
            <div className={classes.margin}>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <SearchIcon />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="search"
                            label="Find Transaction"
                            className={classes.inputMargin}
                            value={searchVal}
                            onChange={onChangeSearch}
                            margin="normal"
                            variant="standard"
                        />
                    </Grid>
                </Grid>
            </div>
          <br />
          <Radio
              checked={searchOn === 'all'}
              onChange={setSearchOn}
              value="all"
              name="search_on"
              aria-label="a"
              label="all"
          />
          All
          <Radio
              checked={searchOn === 'charge'}
              onChange={setSearchOn}
              value="charge"
              name="search_on"
              aria-label="b"
              label="charges"
          />
          Charges
          <Radio
              checked={searchOn === 'credit'}
              onChange={setSearchOn}
              value="credit"
              name="search_on"
              aria-label="c"
              label="credits"
          />
          Credits
        </div>
      );
    }
  }

TransactionSearch.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(TransactionSearch);