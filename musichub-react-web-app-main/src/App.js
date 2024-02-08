import { HashRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Container from "react-bootstrap/Container";
import CurrentUser from "./components/users/current-user";
import ProtectedRoute from "./components/users/protected-route";
import PublicProfile from "./components/users/public-profile";
import Register from "./components/users/register";
import Login from "./components/users/login";
import Users from "./components/users";
import Profile from "./components/users/profile";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Search from "./components/search";
import SongDetails from "./components/song-details";
import Event from "./components/events";
import EventCreate from "./components/events/event-create";
import EventDetails from "./components/events/event-details";
import ProtectedEventCreate from "./components/events/protected-event-create";
import searchReducer from "./components/search/search-reducer";
import randomSongReducer from "./components/random-tracks/randomSongReducer";
import songDetailsReducer from "./components/song-details/song-details-reducer";
import EventReducer from "./components/events/event-reducer";
import usersReducer from "./components/users/users-reducer";
import reviewsReducer from "./components/reviews/reviews-reducer";
import followsReducer from "./components/follows/follows-reducer";
import AdminDashboard from "./components/admin";
import ProtectedAdminDashboard from "./components/admin/protected-admin-dashboard";

const store = configureStore({
  reducer: {
    search: searchReducer,
    randomSongs: randomSongReducer,
    songDetails: songDetailsReducer,
    event: EventReducer,
    users: usersReducer,
    reviews: reviewsReducer,
    follows: followsReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <CurrentUser>
          <Navbar />
          <Container className={"mt-3 mb-3"}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/search/:searchName" element={<Search />} />
              <Route path="/song/details/:mid" element={<SongDetails />} />
              <Route path="/event" element={<Event />} />
              <Route
                path="/admin"
                element={
                  <ProtectedAdminDashboard>
                    <AdminDashboard />
                  </ProtectedAdminDashboard>
                }
              />
              <Route
                path="/event/create"
                element={
                  <ProtectedEventCreate>
                    <EventCreate />
                  </ProtectedEventCreate>
                }
              />
              <Route path="/event/details/:bid" element={<EventDetails />} />
              <Route path="/users" element={<Users />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/profile/:uid" element={<PublicProfile />} />
            </Routes>
          </Container>
        </CurrentUser>
      </HashRouter>
    </Provider>
  );
}

export default App;
