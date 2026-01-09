import { render, screen } from "@testing-library/react";

import MarketingWrapper from "@test/MarketingWrapper";

import WorkshopLinks, { links } from "./WorkshopLinks";

describe("<WorkshopLinks />", () => {
  it("renders", () => {
    const title = "Workshop";

    render(<WorkshopLinks />, {
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
