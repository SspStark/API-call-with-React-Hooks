import { useState, useEffect } from "react";
import Loader from "react-loader-spinner";

import LeaderBoardTable from "../LeaderBoardTable";

import {
  LeaderBoardContainer,
  LoadingViewContainer,
  ErrorMessage,
} from "./styledComponents";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const LeaderBoard = () => {
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    errorMsg: null,
  });

  useEffect(() => {
    const getLeaderBoardData = async () => {
      setApiResponse((prevState) => ({
        ...prevState,
        status: apiStatusConstants.inProgress,
      }));

      const url = "https://apis.ccbp.in/leaderboard";
      const options = {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU",
        },
      };

      const response = await fetch(url, options);
      const responseData = await response.json();
      if (response.ok) {
        setApiResponse((prevApiDetails) => ({
          ...prevApiDetails,
          status: apiStatusConstants.success,
          data: responseData,
        }));
      } else {
        setApiResponse((prevApiDetails) => ({
          ...prevApiDetails,
          status: apiStatusConstants.failure,
          errorMsg: responseData.error_msg,
        }));
      }
    };

    getLeaderBoardData();
  }, []);

  const renderFailureView = () => {
    const { errorMsg } = apiResponse;
    return <ErrorMessage>{errorMsg}</ErrorMessage>;
  };

  const renderSuccessView = () => {
    const { data } = apiResponse;
    const formattedLeaderBoardData = data.leaderboard_data.map((eachUser) => ({
      id: eachUser.id,
      rank: eachUser.rank,
      name: eachUser.name,
      profileImgUrl: eachUser.profile_image_url,
      score: eachUser.score,
      language: eachUser.language,
      timeSpent: eachUser.time_spent,
    }));

    return <LeaderBoardTable leaderBoardData={formattedLeaderBoardData} />;
  };

  const renderLoadingView = () => (
    <LoadingViewContainer>
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </LoadingViewContainer>
  );

  const renderLeaderBoard = () => {
    const { status } = apiResponse;

    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  return <LeaderBoardContainer>{renderLeaderBoard()}</LeaderBoardContainer>;
};

export default LeaderBoard;
