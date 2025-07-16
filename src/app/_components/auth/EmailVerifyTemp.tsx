// components/emails/VerifyEmail.tsx

import { Body } from "@react-email/body";
import { Button } from "@react-email/button";
import { Tailwind } from "@react-email/components";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Hr } from "@react-email/hr";
import { Html } from "@react-email/html";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";

interface VerifyEmailProps {
  userName?: string;
  confirmationLink: string;
}

export const EmailVerifyTemp = ({
  userName = "there",
  confirmationLink,
}: VerifyEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>

      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto max-w-xl p-6">
            <Text className="mb-2 text-2xl font-bold text-gray-800">
              Verify your email
            </Text>
            <Text className="mb-4 text-base text-gray-600">
              Hi {userName},<br />
              Thank you for signing up. Please verify your email address by
              clicking the button below. Valid for 30 mins.
            </Text>

            <Section className="mb-6 text-center">
              <Button
                href={confirmationLink}
                className="rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white"
              >
                Verify Email
              </Button>
            </Section>

            <Text className="text-sm text-gray-500">
              If the button doesn’t work, copy and paste the following link into
              your browser:
              <br />
              <a href={confirmationLink} className="break-words text-blue-600">
                {confirmationLink}
              </a>
            </Text>

            <Hr className="my-6 border-gray-200" />

            <Text className="text-xs text-gray-400">
              If you didn’t create an account, you can safely ignore this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailVerifyTemp;
