import SettingsBackButton from "@/src/app/_components/reusables/SettingsBackButton";
import FontOptions from "@/src/app/_components/settings/FontOptions";
import { getSettings } from "@/src/app/_lib/data-service/settings";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return (
    <div className="w-full space-y-4 px-4 py-6">
      <div className="space-y-5">
        {}
        <div className="space-y-3">
          <SettingsBackButton />
          <h1 className="text-preset-1 text-neutral-950 capitalize">
            {" "}
            color theme
          </h1>

          <p className="text-preset-5 text-neutral-700">
            Choose your color theme:
          </p>
        </div>

        {/* options */}
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FontOptions />
        </HydrationBoundary>
      </div>
    </div>
  );
}

// using database and local storage, use the use optimistic hook
