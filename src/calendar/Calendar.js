import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import "./CalendarStyles.css";

const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    // marginRight: "1rem",
    marginRight:"-4rem",

  },
  main: {
    flexGrow: "2",
    // marginRight: "2rem",

  
  }
  
};

class Calendar extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      
      viewType: "Week",
      durationBarVisible: false,
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: async args => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
        dp.clearSelection();
        if (!modal.result) { return; }
        dp.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result
        });
      },
      eventDeleteHandling: "Update",
      onEventClick: async args => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
        if (!modal.result) { return; }
        const e = args.e;
        e.data.text = modal.result;
        dp.events.update(e);
      },
    };
  }


  componentDidMount() {

    // load event data
    this.setState({
      startDate: "2022-07-06",
      events: [
        {
          id: 1,
          text: "Event 1",
          start: "2022-07-06T10:30:00",
          end: "2022-07-06T13:00:00"
        },
        {
          id: 2,
          text: "Event 2",
          start: "2022-07-08T09:30:00",
          end: "2022-07-08T11:30:00",
          backColor: "#6aa84f"
        },
        {
          id: 3,
          text: "Event 3",
          start: "2022-07-08T12:00:00",
          end: "2022-07-08T15:00:00",
          backColor: "#f1c232"
        },
        {
          id: 4,
          text: "Event 4",
          start: "2022-07-05T11:30:00",
          end: "2022-07-05T14:30:00",
          backColor: "#cc4125"
        },
      ]
    });
  }

  render() {
    const {...config} = this.state;

    return (
      <div style={styles.wrap}>
  
        <div class="date-cald" style={styles.left}>
          <DayPilotNavigator
            selectMode={"week"}
            showMonths={1}
            skipMonths={1}
            startDate={"2022-07-06"}
            selectionDay={"2022-07-06"}
            onTimeRangeSelected={ args => {
              this.setState({
                startDate: args.day
              });
            }}
          />
          <div class="day-cald">
        
            <DayPilotCalendar
              // {...day_config}
            
              ref={component => {
                this.calendar = component && component.control;
              }}
              

            />

          </div>
        
        </div>
        
        <div style={styles.main}>
        <DayPilotCalendar
          {...config}
          ref={component => {
            this.calendar = component && component.control;
          }}
        />
        </div>

   
  
      </div>

      

    );
  }
}

export default Calendar;