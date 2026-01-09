import type { FC } from "react";

import FooterLinks from "../../shared/components/FooterLinks";

export const links = [
  {
    text: "Catalog",
    href: "https://catalog-mfe.bitovi-sandbox.com",
    external: true,
  },
  {
    text: "Marketing",
    href: "https://marketing-mfe.bitovi-sandbox.com",
    external: true,
  },
  {
    text: "Order",
    href: "https://order-mfe.bitovi-sandbox.com",
    external: true,
  },
  {
    text: "Profile",
    href: "https://profile-mfe.bitovi-sandbox.com",
    external: true,
  },
];

const RemoteLinks: FC = () => {
  return <FooterLinks title="Remotes" links={links} />;
};

export default RemoteLinks;
