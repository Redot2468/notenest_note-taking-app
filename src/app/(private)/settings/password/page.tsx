import SettingsBackButton from "@/src/app/_components/reusables/SettingsBackButton";
import PasswordChangeForm from "@/src/app/_components/settings/PasswordChangeForm";
import { getUserById } from "@/src/app/_lib/data-service/auth";
import { getAuthSession } from "@/src/app/_utils/getSession";

export default async function Page() {
  const session = await getAuthSession();
  const user = await getUserById(session?.id as string);

  return (
    <div className="w-full space-y-4 px-4 py-6">
      {" "}
      <div className="space-y-5">
        {}
        <div className="space-y-3">
          <SettingsBackButton />

          <h1 className="text-preset-1 text-neutral-950 capitalize">
            {" "}
            change password
          </h1>
        </div>
      </div>
      {user?.emailVerified && !user?.password ? (
        <div className="radius-8 text-preset-5 mt-4 w-full border border-neutral-200 bg-neutral-100 p-2 text-neutral-950">
          <p>
            You&apos;re using Google to sign in to your account. To change your
            password or manage your login security, please visit your Google
            account settings.
          </p>
        </div>
      ) : (
        <PasswordChangeForm />
      )}
    </div>
  );
}
