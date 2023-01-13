import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Button, Heading, Text, TextArea } from "@ignite-ui/react";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../lib/axios";
import { buildNextAuthOptions } from "../../api/auth/[...nextauth].api";
import { Container, Header } from "../styles";
import { FormAnnotation, ProfileBox } from "./styles";

const updateProfileSchema = z.object({
  bio: z.string(),
});

type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  });

  const session = useSession();
  const router = useRouter();
  console.log(session);

  async function handleUpdateProfile(data: UpdateProfileData) {
    await api.put("/users/profile", {
      bio: data.bio,
    });

    await router.push(`/schedule/${session.data?.user.username}`);
  }

  return (
    <>
      <Container>
        <Header>
          <Heading as="strong">Welcome to SchedCall</Heading>
          <Text>We need some information to create your profile</Text>
        </Header>

        <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
          <label>
            <Text>Avatar photo</Text>
            <Avatar
              src={session.data?.user.avatar_url}
              referrerPolicy="no-referrer"
              alt={session.data?.user.name}
            />
          </label>

          <label>
            <Text size="sm">About you</Text>
            <TextArea {...register("bio")} />
            <FormAnnotation size="sm">
              Bio: let us know a little bit of what you do. This section will
              appear in your profile.
            </FormAnnotation>
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Done!
            <ArrowRight />
          </Button>
        </ProfileBox>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );
  return {
    props: {
      session,
    },
  };
};
