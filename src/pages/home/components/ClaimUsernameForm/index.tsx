import { Button, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { Form } from "./styles";

export function ClaimUsernameForm() {
  return (
    <Form as="form">
      <TextInput size="sm" prefix="schedcall.com/" placeholder="your-user" />
      <Button size="sm" type="submit">
        Claim Username
        <ArrowRight />
      </Button>
    </Form>
  );
}
