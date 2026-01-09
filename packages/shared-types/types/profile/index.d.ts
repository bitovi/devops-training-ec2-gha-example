import type { FC } from "react";

export namespace Profile {
  export type Account = FC;
  export type Login = FC<{ onLoginSuccess?: () => void }>;
}
