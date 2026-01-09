import { render, screen } from "@testing-library/react";

import MarketingWrapper from "@test/MarketingWrapper";

import CompanyLinks, { links } from "./RemoteLinks";

describe("<CompanyLinks />", () => {
  it("renders", () => {
    const title = "Company";

    render(<CompanyLinks />, {
      wrapper: MarketingWrapper,
    });

    expect(screen.getByText(title)).toBeInTheDocument();

    links.forEach((link) => {
      const domLink = screen.getByText(link.text);

      expect(domLink).toBeInTheDocument();
      expect(domLink).toHaveAttribute("href", link.href);
    });
  });
});
