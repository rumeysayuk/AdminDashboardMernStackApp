import React from 'react';
import {Header} from "../components";
import {
   Day, ScheduleComponent, WorkWeek, Week,
   Agenda, Resize, Month, DragAndDrop, Inject
} from "@syncfusion/ej2-react-schedule";
import {scheduleData} from "../data/dummy";

const Calendar = () => {
   return (
      <div className={"m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl"}>
         <Header category={"App"} title={"Calendar"}/>
         <ScheduleComponent height={"650px"} eventSettings={{dataSource: scheduleData}}
                            selectedDate={new Date(2021, 0, 10)}>
            <Inject services={[Day, Week, WorkWeek, Agenda, Resize, Month, DragAndDrop]}/>
         </ScheduleComponent>
      </div>
   )
}

export default Calendar;