import { Button, Checkbox, Heading, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
// import { useRouter } from "next/router";
// import { api } from "../api/axios";
import { Container, Header } from "../styles";
import {
  IntervalBox,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  IntervalsContainer,
} from "./styles";

export default function TimeIntervals() {
  return (
    <Container>
      <Header>
        <Heading as="strong">Almost there!</Heading>
        <Text>Set your availability in each day of the week</Text>
      </Header>
      <IntervalBox as="form">
        <IntervalsContainer>
          <IntervalItem>
            <IntervalDay>
              <Checkbox />
              <Text>Monday</Text>
            </IntervalDay>
            <IntervalInputs>
              <TextInput size="sm" type="time" step={60} />
              <TextInput size="sm" type="time" step={60} />
            </IntervalInputs>
          </IntervalItem>
          <IntervalItem>
            <IntervalDay>
              <Checkbox />
              <Text>Tuesday</Text>
            </IntervalDay>
            <IntervalInputs>
              <TextInput size="sm" type="time" step={60} />
              <TextInput size="sm" type="time" step={60} />
            </IntervalInputs>
          </IntervalItem>
        </IntervalsContainer>
        <Button type="submit">
          Next Step <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  );
}
