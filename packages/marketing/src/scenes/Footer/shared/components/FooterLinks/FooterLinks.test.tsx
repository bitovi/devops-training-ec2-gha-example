import { render, screen } from "@testing-library/react";

import MarketingWrapper from "@test/MarketingWrapper";

import FooterLinks from "./FooterLinks";

describe("<FooterLinks />", () => {
  it("renders", () => {
    const title = "Test Title";
    const links = [
      { text: "To Test!", href: "/test" },
      { text: "To Elsewhere!", href: "/elsewhere" },
    ];

    render(<FooterLinks title={title} links={links} />, {
      wrapper: MarketingWrapper,
    });

    expect(screen.getByText(title)).toBeInTheDocument();

    links.forEach((link) => {
      const domLink = screen.getByText(link.text);

      expect(domLink).toBeInTheDocument();
      expect(domLink).toHaveAttribute("href", link.href);
    });
  });

  it("renders empty", () => {
    const title = "Test Title";

    render(<FooterLinks title={title} links={[]} />, {
      wrapper: MarketingWrapper,
    });

    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
