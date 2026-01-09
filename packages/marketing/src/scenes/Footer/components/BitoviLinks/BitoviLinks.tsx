import type { FC } from "react";

import FooterLinks from "../../shared/components/FooterLinks";

export const links = [
  {
    text: "Frontend",
    href: "https://www.bitovi.com/services/frontend-development-consulting",
    external: true,
  },
  {
    text: "Project Management",
    href: "https://www.bitovi.com/services/agile-project-management-consulting",
    external: true,
  },
  {
    text: "Product Design",
    href: "https://www.bitovi.com/services/product-design-consulting",
    external: true,
  },
  {
    text: "Backend",
    href: "https://www.bitovi.com/services/backend-engineering-consulting",
    external: true,
  },
  {
    text: "DevOps",
    href: "https://www.bitovi.com/services/devops-consulting",
    external: true,
  },
];

const BitoviLinks: FC = () => {
  return <FooterLinks title="Bitovi" links={links} />;
};

export default BitoviLinks;
