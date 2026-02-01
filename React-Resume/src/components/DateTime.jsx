import React, { useEffect, useState } from "react";

const DateTime = () => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    function updateDateTime() {
      const now = new Date();

      const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
      const months = [
        "jan", "feb", "mar", "apr", "may", "jun",
        "jul", "aug", "sep", "oct", "nov", "dec"
      ];

      const day = days[now.getDay()];
      const month = months[now.getMonth()];
      const date = now.getDate();

      let hours = now.getHours(); // 24-hour
      let minutes = now.getMinutes();

      let ampm = hours >= 12 ? "pm" : "am";

      if (minutes < 10) minutes = "0" + minutes;
      if (hours < 10) hours = "0" + hours;

      const finalTime =
        day + " " +
        month + " " +
        date + " " +
        hours + ":" +
        minutes + " " +
        ampm;

      setDateTime(finalTime);
    }

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>{dateTime}</div>;
};

export default DateTime;
