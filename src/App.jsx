import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

async function post(url, { arg }) {
  return await axios(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    data: JSON.stringify(arg),
  });
}

function App() {
  const [messages, setMessages] = useState([]);
  // const { data, error } = useSWR("/api/data", fetcher);
  const { trigger: sendMessage } = useSWRMutation(
    "http://172.28.119.181:8000/examples.ex7/run",
    post,
    {
      onSuccess: (response) => {
        console.log(response.data);
        const { error, memory, output } = response.data;
        setMessages((prev) => [
          ...prev,
          {
            message: output,
            error,
            memory,
            sentTime: new Date().toISOString(),
            sender: "Bot",
            direction: "incoming",
          },
        ]);
      },
    }
  );

  return (
    <div style={{ position: "relative", height: "500px" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages.map((msg, idx) => {
              return <Message key={idx} model={msg} />;
            })}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            onSend={(innerHtml, textContext) => {
              setMessages((prev) => [
                ...prev,
                {
                  message: textContext,
                  sentTime: new Date().toISOString(),
                  sender: "Me",
                  direction: "outgoing",
                },
              ]);
              sendMessage({
                // input: textContext,
                question: textContext,
                history: "",
                memory: [{}],
              });
            }}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default App;
