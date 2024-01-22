import React, { createContext, useContext, useState } from "react";

const OverviewContext = createContext();

export const OverviewProvider = ({ children }) => {
  const [isOverviewSaved, setIsOverviewSaved] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isContestDetail, setIsContestDetail] = useState({
    contestName: "",
    contestOrganizer: "",
    contestCreator: [{}],
    startTime: "",
    endTime: "",
    isSubmitted: false,
    isPublished: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const setOverviewSaved = (value) => {
    setIsOverviewSaved(value);
    console.log(isOverviewSaved);
  };
  const setContesttDetail = (value) => {
    setIsContestDetail(value);
    console.log(isContestDetail);
  };
  const setSubmitted = (value) => {
    setIsSubmitted(value);
  };
  const setNotify = (value) => {
    console.log(value);
    setNotifications(value);
  };

  return (
    <OverviewContext.Provider
      value={{
        isOverviewSaved,
        setOverviewSaved,
        isContestDetail,
        setContesttDetail,
        isSubmitted,
        setSubmitted,
        notifications,
        setNotify,
      }}
    >
      {children}
    </OverviewContext.Provider>
  );
};

export const useOverview = () => {
  return useContext(OverviewContext);
};
