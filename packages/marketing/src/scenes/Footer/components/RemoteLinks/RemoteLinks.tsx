import type { FC } from "react";

import FooterLinks from "../../shared/components/FooterLinks";

export const links = [
  {
    text: "Catalog",
    href: "https://catalog-mfe.lodiaz.com.ar",
    external: true,
  },
  {
    text: "Marketing",
    href: "https://marketing-mfe.lodiaz.com.ar",
    external: true,
  },
  {
    text: "Order",
    href: "https://order-mfe.lodiaz.com.ar",
    external: true,
  },
  {
    text: "Profile",
    href: "https://profile-mfe.lodiaz.com.ar",
    external: true,
  },
];

const RemoteLinks: FC = () => {
  return <FooterLinks title="Remotes" links={links} />;
};

export default RemoteLinks;
