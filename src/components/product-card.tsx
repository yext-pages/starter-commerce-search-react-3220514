// src/components/Card.tsx

import * as React from "react";
import { CardProps } from "@yext/search-ui-react";
import { provideSearchAnalytics } from "@yext/analytics";

//replace with the vertical typescript interface this custom card applies to
import Product from "../types/products";

import { experienceKey, experienceVersion, businessId } from "../common/consts";
import { useSearchState } from "@yext/search-headless-react";

export const searchAnalytics = provideSearchAnalytics({
  experienceKey: experienceKey,
  experienceVersion: experienceVersion,
  businessId: businessId
})

const Card = ({
    result,
    //replace the interface FAQ with the typescript interface of your vertical
  }: CardProps<Product>) : JSX.Element => {
    //pull in the relevant fields from your entity to display on the card
    const data: any = {
        name: result.rawData.name,
        image: result.rawData.primaryPhoto?.image.url,
        landingPageUrl: result.rawData.landingPageUrl,
        price: result.rawData.price?.value,
        cta1: result.rawData.commerce_primaryCTA
    }

    //replace below with the appropriate vertical key
    const verticalKey = 'products'

    //analytics configuration for the card
    const queryId = useSearchState((state)=>state.query.queryId) || "";
    const fireClick = (id:string,label:string)=>{
        searchAnalytics.report({
            type: "CTA_CLICK",
            entityId: id,
            verticalKey: verticalKey,
            searcher: "VERTICAL",
            queryId: queryId,
        })
    };
    const fireTitle = (id:string)=> {
        searchAnalytics.report({
            type: "TITLE_CLICK",
            entityId: id,
            verticalKey: verticalKey,
            searcher: "VERTICAL",
            queryId: queryId,
        })
    }

    return (
    <a href={`${data.landingPageUrl}`} target = "_top" rel="noreferrer">
       <div className="details rounded-lg border mb-4 p-4 text-stone-900 shadow-sm flex flex-col space-between h-full">
         <div className="prominent-image flex flex-col object-cover">
            {data.image && (
                <img src={`${data.image}`}></img>
            )} 
        </div>
        <div className="title text-xl font-bold mt-4 ml-4">
            {data.name}
        </div>
        <div className="product-details ml-4 text-lg flex flex-col">
            <span className="price">${data.price}</span>
            <button className="primaryCTA bg-violet-500 text-white rounded-xl h-8 mt-4 place-content-stretch ">
                <a href={data.cta1.link}>{data.cta1.label}</a>
            </button>
        </div>
       </div>
    </a>
    )
};

export default Card;