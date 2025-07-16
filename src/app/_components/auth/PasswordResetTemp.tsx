// components/emails/ResetPassword.tsx

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

interface ResetPasswordProps {
  userName?: string;
  resetUrl: string;
}

export const ResetPassword = ({
  userName = "there",
  resetUrl,
}: ResetPasswordProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your password for your account</Preview>

      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto max-w-xl p-6">
            <Text className="mb-2 text-2xl font-bold text-gray-800">
              Reset your password
            </Text>

            <Text className="mb-4 text-base text-gray-700">
              Hello {userName},<br />
              We received a request to reset your password. Click the button
              below to choose a new password.
            </Text>

            <Section className="mb-6 text-center">
              <Button
                href={resetUrl}
                className="rounded-md bg-red-600 px-6 py-3 text-sm font-medium text-white"
              >
                Reset Password
              </Button>
            </Section>

            <Text className="text-sm text-gray-600">
              If you didn’t request a password reset, you can safely ignore this
              email.
              <br />
              This reset link will expire in 1 hour.
            </Text>

            <Hr className="my-6 border-gray-200" />

            <Text className="text-xs text-gray-400">
              Having trouble? Copy and paste this URL into your browser:
              <br />
              <a href={resetUrl} className="break-words text-red-600">
                {resetUrl}
              </a>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetPassword;
