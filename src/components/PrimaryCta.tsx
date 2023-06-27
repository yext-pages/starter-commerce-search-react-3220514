import * as React from "react";
import { Link } from "@yext/pages/components";

type Cta = {
  buttonText: string;
  url: string;
  style?: string;
};

const PrimaryCta = (props: Cta) => {
  const { buttonText, url, style } = props;

  return (
    <Link
      href={url}
      className={`${style}` + " rounded-xl text-white px-4 py-1 text-center"}
      target="_blank"
      rel="noopener noreferrer"
      eventName={`click_${buttonText}`}
    >
      {buttonText}
    </Link>
  );
};

export default PrimaryCta;
