declare module "profile/account" {
  import type { FC } from "react";

  export default function Account(props: {
    checkoutUrl?: string;
  }): ReturnType<FC>;
}

declare module "profile/login" {
  import type { FC } from "react";

  export default function Login(props: {
    onLoginSuccess?: () => void;
  }): ReturnType<FC>;
}
