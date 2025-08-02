"use client";

import { store } from "@/src/app/_lib/redux/store";
import { ChildrenType } from "@/src/app/_utils/types";
import { Provider } from "react-redux";

export default function StoreProvider({ children }: ChildrenType) {
  return <Provider store={store}>{children}</Provider>;
}
