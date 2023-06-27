// src/components/Card.tsx

import * as React from "react";
import { CardProps } from "@yext/search-ui-react";
import { provideSearchAnalytics } from "@yext/analytics";
import PrimaryCta from "./PrimaryCta";

//replace with the vertical typescript interface this custom card applies to
import Product from "../types/products";

import { experienceKey, experienceVersion, businessId } from "../common/consts";
import { useSearchState } from "@yext/search-headless-react";

export const searchAnalytics = provideSearchAnalytics({
  experienceKey: experienceKey,
  experienceVersion: experienceVersion,
  businessId: businessId,
});

const Card = ({
  result,
}: //replace the interface FAQ with the typescript interface of your vertical
CardProps<Product>): JSX.Element => {
  //pull in the relevant fields from your entity to display on the card
  const data: any = {
    name: result.rawData.name,
    image: result.rawData.primaryPhoto?.image.url,
    landingPageUrl: result.rawData.landingPageUrl,
    price: result.rawData.price?.value,
    cta1: result.rawData.commerce_primaryCTA,
  };

  //replace below with the appropriate vertical key
  const verticalKey = "products";

  //analytics configuration for the card
  const queryId = useSearchState((state) => state.query.queryId) || "";
  const fireClick = (id: string, label: string) => {
    searchAnalytics.report({
      type: "CTA_CLICK",
      entityId: id,
      verticalKey: verticalKey,
      searcher: "VERTICAL",
      queryId: queryId,
    });
  };
  const fireTitle = (id: string) => {
    searchAnalytics.report({
      type: "TITLE_CLICK",
      entityId: id,
      verticalKey: verticalKey,
      searcher: "VERTICAL",
      queryId: queryId,
    });
  };

  return (
    <div className="details rounded-lg border mb-4 p-4 text-stone-900 shadow-sm flex flex-col space-between h-full">
      <div className="prominent-image flex flex-col object-cover">
        <a href={`${data.landingPageUrl}`} target="_top" rel="noreferrer">
          {data.image && <img src={`${data.image}`}></img>}
        </a>
      </div>
      <div className="title text-xl font-bold mt-4 ml-4">{data.name}</div>
      <div className="product-details ml-4 text-lg flex flex-col mb-auto">
        <span className="price">${data.price}</span>
      </div>
      <PrimaryCta buttonText={data.cta1.label} url="" style="bg-primary" />
    </div>
  );
};

export default Card;
