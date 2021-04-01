import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { usePubnub } from "../contexts/PubNubContext";

const Lobby = () => {
  const [username, setUsername] = useState(null);
  const [isInvite, setIsInvite] = useState(false);
  const navigate = useNavigate();
  const { channelId } = useParams();
  const { subscribeToChannel, updateUserInfo } = usePubnub();


  useEffect(() => {
    if (window.location.pathname == `/invite/${channelId}`) {
      setIsInvite(true);
    }
  }, [channelId])

  const getRandomRoomName = () => {
    return Math.random().toString(20).substr(2, 10);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isInvite) {
      const roomname = getRandomRoomName();
      updateUserInfo(username, roomname);
      subscribeToChannel(roomname, username);
      navigate(`/channel/${roomname}`, { state: { username } });
    } else {
      updateUserInfo(username, channelId);
      subscribeToChannel(channelId, username);
      navigate(`/channel/${channelId}`, { state: { username } });
    }
  };

  return (
    <div id="lobby-wrapper">
      <h1>DigiBoard</h1>
      <div id="lobby-invite-info">
        {
          isInvite 
          ? (
              <>
                <p>You are invited to join a digital collaboration session.</p> 
                <p>Please select a username and join the Digiboard.</p>
              </>
          ) : (
            <>
              <p>The number one place for digital collaborations.</p>
              <p>Please select a username to create a Digiboard.</p>
            </>
          )
        }
      </div>
      <form id="lobby-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Choose a username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button>
          { isInvite ? (
              "Join Digiboard"
            ) : (
              "Create Digiboard"
            )
          }
          </button>
      </form>
    </div>
  );
};

export default Lobby;
