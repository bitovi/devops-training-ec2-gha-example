import { render, screen } from "@testing-library/react";

import MarketingWrapper from "@test/MarketingWrapper";

import BitoviLinks, { links } from "./BitoviLinks";

describe("<BitoviLinks />", () => {
  it("renders", () => {
    const title = "Bitovi";

    render(<BitoviLinks />, {
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
