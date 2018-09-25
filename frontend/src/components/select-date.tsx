import { Button, Paper } from '@material-ui/core';
import Axios from 'axios';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import { MaterialUiPickersDate } from 'material-ui-pickers/typings/date';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import * as moment from 'moment';
import * as React from 'react';
import { Component, MouseEvent } from 'react';

interface SelectDateProps {
  date?: Date | null;
}

interface SelectDateStatus {
  date: Date;
}

export default class SelectDate extends Component<SelectDateProps, SelectDateStatus> {

  constructor(props: SelectDateProps) {
    super(props);
    this.state = {
      date: props.date || new Date()
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  public render() {
    return (
      <Paper className="paper center" elevation={1}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            keyboard={true}
            value={this.state.date}
            onChange={this.handleDateChange}
          />
        </MuiPickersUtilsProvider>
        <Button
          variant="raised"
          onClick={this.handleDownload}
        >
          Download
        </Button>
      </Paper>
    );
  }

  private handleDateChange(date: MaterialUiPickersDate) {
    this.setState(prevState => ({ ...prevState, date }));
  }

  private handleDownload(event: MouseEvent) {
    event.preventDefault();
    const date = moment(this.state.date).format('YYYY-MM-DD');
    console.log(date); // tslint:disable-line:no-console
    Axios.post('/api/downloader', { date });
  }
}
