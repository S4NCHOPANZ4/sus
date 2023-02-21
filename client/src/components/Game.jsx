import React, { useState } from "react";
import Board from "./Board";
import { Window, MessageList, MessageInput } from "stream-chat-react";
import "./Chat.css";
function Game({ channel, setChannel }) {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const [result, setResult] = useState({ winner: "none", state: "none" });

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });
  if (!playersJoined) {
    return <div className="register__title waiter"> Waiting for other player to join...</div>;
  }
  return (
    <div className="gameContainer">
      <h1 className="register__title">tic tac toe!</h1>
      <div className="main">
      <Board result={result} setResult={setResult} />
      <Window>
        <MessageList
          disableDateSeparator
          closeReactionSelectorOnClick
          hideDeletedMessages
          messageActions={["react"]}
          />
        <MessageInput noFiles />
      </Window>
        </div>
        {result.state === "won" && <div className="win"> {result.winner} Won The Game</div>}
      {result.state === "tie" && <div className="win"> Game Tieds</div>}
      <button
      className="leave"
        onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
        }}
      >
        {" "}
        Leave Game
      </button>
      
    </div>
  );
}

export default Game;
