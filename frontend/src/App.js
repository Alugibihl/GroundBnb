// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormModal from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/Spots/AllSpots";
import SpotDetails from "./components/Spots/SpotDetails";
import CreateSpotForm from "./components/Spots/CreateSpotForm";
import EditSpotForm from "./components/Spots/EditSpotForm";
import ManageSpots from "./components/Spots/ManageSpots";
import ManageReviews from "./components/Reviews/ManageReviews";
import CreateReviewForm from "./components/Reviews/CreatReviewForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/signup">
            <SignupFormModal />
          </Route>
          <Route exact path={'/reviews/current'}>
            <ManageReviews />
          </Route>
          <Route exact path={'/spots/:spotId/reviews/new'}>
            <CreateReviewForm />
          </Route>
          <Route exact path={'/spots/new'}>
            <CreateSpotForm />
          </Route>
          <Route exact path={'/spots/current'}>
            <ManageSpots />
          </Route>
          <Route exact path={'/spots/:spotId/edit'}>
            <EditSpotForm />
          </Route>
          <Route exact path={'/spots/:spotId'}>
            <SpotDetails />
          </Route>
          <Route exact path={'/'} >
            <AllSpots />
          </Route>
        </Switch>
      )
      }
    </>
  );
}

export default App;
