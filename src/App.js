//This code was written in VS Code.

import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";
import CountrySelector from "./components/CountrySelector";

function App() {
  const test = (value) => {
    setCountry(value);
  };

  const [eventsCollection, setEventsList] = useState([]);
  const [country, setCountry] = useState("pk");

  useEffect(() => {
    fetch(
      "https://calendarific.com/api/v2/holidays?api_key=a0cf4d66ea86f9a866402f94cb8f514624c44d95&country=" +
        country +
        "&year=2021"
    )
      .then((resp) => resp.json())
      .then((result) => {
        const listresult = result.response.holidays;
        const eventList = [];
        for (let index = 0; index < listresult.length; index++) {
          let obj = {
            title: listresult[index].name,
            start: listresult[index].date.iso,
            end: listresult[index].date.iso,
          };
          eventList.push(obj);
        }
        setEventsList(eventList);
      });
  }, [country]);

  const locales = {
    "en-US": enUS,
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const myEventsList = [
    {
      start: new Date(),
      end: new Date(),
      title: "Test",
    },
  ];

  return (
    <div className="App">
      <h1>Holidays Calendar</h1>
      <CountrySelector country={country} handle={test} />
      <Calendar
        localizer={localizer}
        events={eventsCollection}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

export default App;
