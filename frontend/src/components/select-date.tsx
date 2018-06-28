
import Button from '@material-ui/core/Button/Button';
import Paper from '@material-ui/core/Paper/Paper';
import Axios from 'axios';
import DatePicker from 'material-ui-pickers/DatePicker/DatePicker';
import { Component, MouseEvent } from 'react';
import * as React from 'react';
import * as moment from 'moment';

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
  }

  render() {
    return (
      <Paper className="paper center" elevation={1}>
        <DatePicker
          date={this.state.date}
          onChange={this.handleDateChange}
        />
        <Button variant="raised" onClick={event => this.download(event)}>Download</Button>
      </Paper>
    );
  }

  private handleDateChange(date: Date) {
    this.setState(prevState => ({ ...prevState, date }));
  }

  private download(event: MouseEvent<Object>) {
    event.preventDefault();
    const formattedDate = moment(this.state.date).format('YYYY-MM-DD');
    console.log(formattedDate); // tslint:disable-line:no-console
    Axios.post('/api/downloader', { date: formattedDate });
  }
}
