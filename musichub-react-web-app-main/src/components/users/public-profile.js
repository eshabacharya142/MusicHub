import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findUserByIdThunk } from './users-thunk';
import { findReviewsByHostThunk } from '../reviews/reviews-thunks';
import { Link } from 'react-router-dom';
import {
  findFollowersThunk,
  findFollowingThunk,
  followUserThunk,
} from '../follows/follows-thunks';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Badge } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Follows from '../follows/follows';
import Likes from '../likes/likes';
import { getEventsByUserIdThunk } from '../events/event-thunks';
import { userLikesSongsThunk } from '../likes/likes-thunks';
import { parseTime } from '../events/parseTime';

const PublicProfile = () => {
  const { uid } = useParams();
  const { publicProfile } = useSelector((state) => state.users);
  const { currentUser } = useSelector((state) => state.users);
  let { event } = useSelector((state) => state.event);
  const { reviews } = useSelector((state) => state.reviews);
  const { followers, following } = useSelector((state) => state.follows);
  const [followedBtn, setFollowedBtn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFollowBtn = () => {
    dispatch(
      followUserThunk({
        followed: uid,
      })
    );
    setFollowedBtn(!followedBtn);
  };

  event = event.filter((bg) => bg.host.hostName === publicProfile.username);

  useEffect(() => {
    dispatch(findUserByIdThunk(uid));
    dispatch(getEventsByUserIdThunk(uid));

    dispatch(findReviewsByHostThunk(uid));
    dispatch(findFollowersThunk(uid));
    dispatch(findFollowingThunk(uid));
  }, [uid]);

  return (
    <div className={'mb-3 mt-2'}>
      <div className={'mb-2'}>
        <Link to={-1} className={'text-decoration-none text-secondary'}>
          <i className="bi bi-arrow-left me-1"></i>Back
        </Link>
      </div>

      {publicProfile && (
        <>
          {currentUser ? (
            <>
              {followedBtn ? (
                <Button variant={'outline-success'} className={'float-end'}>
                  Followed
                </Button>
              ) : (
                <Button onClick={handleFollowBtn} className={'float-end'}>
                  Follow
                </Button>
              )}
            </>
          ) : (
            <></>
          )}

          {publicProfile.role === 'MUSIC-CREATOR' ? (
            <img
              src={
                publicProfile.profilePic
                  ? publicProfile.profilePic
                  : 'https://robohash.org/1.png'
              }
              alt="profileImg"
              width="148px"
              height="148px"
              radius="48px"
            />
          ) : (
            ''
          )}
          <h2>@{publicProfile.username}</h2>

          <h5>
            <Badge bg={'secondary'}>
              {publicProfile.role === 'MUSIC-CREATOR' ? 'EVENT-MANAGER' : publicProfile.role}
            </Badge>
          </h5>
          <Container>
            <Form>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="profileFirstName"
              >
                <Form.Label column sm="2" className={'text-secondary'}>
                  First Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    value={publicProfile.firstName}
                    plaintext
                    readOnly
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="profileLastName">
                <Form.Label column sm="2" className={'text-secondary'}>
                  Last Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    value={publicProfile.lastName}
                    plaintext
                    readOnly
                  />
                </Col>
              </Form.Group>

              {currentUser && currentUser.role === 'MUSIC-CREATOR' ? (
                <div>
                  <Form.Group as={Row} className="mb-3" controlId="profileBio">
                    <Form.Label column sm="2" className={'text-secondary'}>
                      Bio
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        type="textarea"
                        value={publicProfile.bio}
                        readOnly
                        plaintext
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="profileWebsite"
                  >
                    <Form.Label column sm="2" className={'text-secondary'}>
                      Website
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        type="text"
                        value={publicProfile.website}
                        readOnly
                        plaintext
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="profilePic">
                    <Form.Label column sm="2" className={'text-secondary'}>
                      Profile Picture
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        type="text"
                        value={publicProfile.profilePic}
                        readOnly
                        plaintext
                      />
                    </Col>
                  </Form.Group>
                </div>
              ) : (
                ''
              )}

              {currentUser && currentUser.role === 'ADMIN' ? (
                <div>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="adminFromDate"
                  >
                    <Form.Label column sm="2" className={'text-secondary'}>
                      Admin Since
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        type="text"
                        value={new Date(currentUser.adminFromDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          timeZone: "UTC",
                        })}
                        readOnly
                        plaintext
                      />
                    </Col>
                  </Form.Group>
                </div>
              ) : (
                ''
              )}
            </Form>

            <hr />

            {publicProfile && publicProfile.role === 'MUSIC-CREATOR' && (
              <>
                <h2>Events</h2>
                <ul className={'list-group mb-3'}>
                  {event && event.length === 0 ? (
                    <p>This user haven't written any event.</p>
                  ) : (
                    event
                      .filter(
                        (bg) => bg.host.hostName === publicProfile.username
                      )
                      .map((e) => (
                        <li
                          className={'list-group-item'}
                          onClick={() => navigate('/event/details/' + e._id)}
                          key={e._id}
                        >
                          <h5>{e.title}</h5>

                          <i
                            onClick={() => {
                              dispatch(userLikesSongsThunk());
                            }}
                            className="red"
                          ></i>
                          <div className={'text-secondary'}>
                            <span>By: {e.host.hostName}</span>
                            <i className="bi bi-dot"></i>
                            <span>{new Date(e.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              timeZone: "UTC",
                            })}</span>
                          </div>
                        </li>
                      ))
                  )}
                </ul>
              </>
            )}

            <Follows uid={publicProfile._id} />

            <h2>Reviews</h2>
            <ul className={'list-group'}>
              {publicProfile && reviews && reviews.length === 0 ? (
                <p>This user haven't posted any reviews yet.</p>
              ) : (
                reviews
                  .filter((u) => u.host._id === uid)
                  .map((u) => (
                    <li
                      className={'list-group-item'}
                      onClick={() => navigate(`/song/details/${u.idSong}`)}
                    >
                      <span className={'fw-bold'}>
                        <Link
                          className={'text-black'}
                          to={`/profile/${u.host._id}`}
                        >
                          {u.host.username}
                        </Link>
                      </span>
                      <span>
                        <i className="bi bi-dot"></i>
                        {parseTime(u.time)}
                      </span>
                      <p>{u.review}</p>
                    </li>
                  ))
              )}
            </ul>
          </Container>
        </>
      )}
    </div>
  );
};

export default PublicProfile;