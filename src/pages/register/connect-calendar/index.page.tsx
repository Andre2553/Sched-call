import { Button, Heading, Text } from "@ignite-ui/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
// import { useRouter } from "next/router";
import { ArrowRight, Check } from "phosphor-react";
// import { api } from "../api/axios";
import { Container, Header } from "../styles";
import { AuthError, ConnectBox, ConnectItem } from "./styles";

export default function Register() {
  const session = useSession();
  const router = useRouter();

  const hasAuthError = !!router.query.error;
  const idSignedIn = session.status === "authenticated";

  async function handleConnectCalendar() {
    await signIn("google");
  }
  return (
    <Container>
      <Header>
        <Heading as="strong">Connect with your calendar!</Heading>
        <Text>Connect your calendar to verify events and appointments.</Text>
      </Header>
      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          {idSignedIn ? (
            <Button disabled>
              Connected <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={() => handleConnectCalendar}
              disabled={idSignedIn}
            >
              Connect
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>
        {hasAuthError && (
          <AuthError size="sm">
            Failed to connect with your calendar. Please verify if you enabled
            all permissions required.
          </AuthError>
        )}
        <Button type="submit" disabled={!idSignedIn}>
          Continue <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  );
}
