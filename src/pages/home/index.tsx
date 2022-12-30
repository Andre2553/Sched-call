import { Heading, Text } from "@ignite-ui/react";
import { Container, Hero, Preview } from "./styles";
import previewImg from "../../assets/img.png";
import Image from "next/image";
import { ClaimUsernameForm } from "./components/ClaimUsernameForm";

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading as="h1" size="4xl">
          Simple Scheduling
        </Heading>
        <Text size="xl">
          Connect your calendar and let people book appointments in their free
          time.
        </Text>
        <ClaimUsernameForm />
      </Hero>

      <Preview>
        <Image
          src={previewImg}
          alt="Calendar displaying a schedule of appointments"
          height={400}
          quality={100}
          priority
        />
      </Preview>
    </Container>
  );
}
