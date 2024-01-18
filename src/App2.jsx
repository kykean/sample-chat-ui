import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

import "semantic-ui-css/semantic.min.css";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import {
  Container,
  Form,
  FormField,
  FormInput,
  Input,
} from "semantic-ui-react";

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

  return (
    <Container>
      <Form>
        <FormField>
          <FormInput fluid label="Claim number" placeholder="Claim number" />
          {/* <input placeholder="Claim number" /> */}
        </FormField>
      </Form>
    </Container>
  );
}

export default App;
