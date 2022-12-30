import { Button, Heading, Text } from "@ignite-ui/react";
// import { useRouter } from "next/router";
import { ArrowRight } from "phosphor-react";
// import { api } from "../api/axios";
import { Container, Header } from "../styles";
import { ConnectBox, ConnectItem } from "./styles";

export default function Register() {
  return (
    <Container>
      <Header>
        <Heading as="strong">Connect with your calendar!</Heading>
        <Text>Connect your calendar to verify events and appointments.</Text>
      </Header>
      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          <Button variant="secondary">
            Connect <ArrowRight />
          </Button>
        </ConnectItem>
        <Button type="submit">
          Continue <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  );
}
