import { Button, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormAnnotation } from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long")
    .regex(/^([a-z\\-]+)$/i, "Only letters and dashes are allowed")
    .transform((value) => value.toLowerCase()),
});
type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  });

  const router = useRouter();

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data;
    await router.push(`/register?username=${username}`);
  }
  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="schedcall.com/"
          placeholder="your-user"
          {...register("username")}
        />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Claim Username
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <Text size="sm">
          {errors.username ? errors.username.message : "Type a username"}
        </Text>
      </FormAnnotation>
    </>
  );
}
