import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Heading, Text, TextInput } from "@ignite-ui/react";
import { useRouter } from "next/router";
import { ArrowRight } from "phosphor-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../lib/axios";
import { Container, Form, FormAnnotation, Header } from "./styles";

const registerForm = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long")
    .regex(/^([a-z\\-]+)$/i, "Only letters and dashes are allowed")
    .transform((value) => value.toLowerCase()),
  name: z.string().min(3, "Name must be at least 3 characters long"),
});

type RegisterFormData = z.infer<typeof registerForm>;

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerForm),
  });

  const router = useRouter();
  useEffect(() => {
    if (router.query.username) {
      setValue("username", String(router.query.username));
    }
  }, [router.query?.username, setValue]);

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post("/users", {
        username: data.username,
        name: data.name,
      });
      await router.push(`/register/connect-calendar?`);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Container>
      <Header>
        <Heading as="strong">Welcome to SchedCall!</Heading>
        <Text>We need some information to get started.</Text>
      </Header>
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text>Username</Text>
          <TextInput
            prefix="schedcall.com/"
            placeholder="your-user"
            {...register("username")}
          />
          {errors.username && (
            <FormAnnotation size="sm">{errors.username.message}</FormAnnotation>
          )}
        </label>
        <label>
          <Text>Full name</Text>
          <TextInput placeholder="Your name" {...register("name")} />
          {errors.name && (
            <FormAnnotation size="sm">{errors.name.message}</FormAnnotation>
          )}
        </label>
        <Button type="submit" disabled={isSubmitting}>
          Continue
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  );
}
