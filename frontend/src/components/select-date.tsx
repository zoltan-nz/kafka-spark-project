
import Axios from 'axios';
import { DatePicker, Paper, RaisedButton } from 'material-ui';
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
      <Paper className="paper center" zDepth={1}>
        <DatePicker
          value={this.state.date}
          onChange={(event, date) => this.updateDate(event, date)}
          hintText="Select a streaming date"
        />
        <RaisedButton label="Download" onClick={event => this.download(event)}/>
      </Paper>
    );
  }

  private updateDate(event: null, date: Date) {
    this.setState(prevState => ({ ...prevState, date }));
  }

  private download(event: MouseEvent<Object>) {
    event.preventDefault();
    const formattedDate = moment(this.state.date).format('YYYY-MM-DD');
    console.log(formattedDate); // tslint:disable-line:no-console
    Axios.post('http://localhost:3000/api/downloader', { date: formattedDate });
  }
}
