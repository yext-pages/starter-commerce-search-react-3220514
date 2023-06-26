// src/templates/search.tsx

import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import "../index.css";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import { 
        apiKey,
        experienceKey,
} from "../common/consts";
import {
  SearchBar,
  VerticalResults,
  StandardFacets,
  ResultsCount,
  AppliedFilters,
  Pagination,
  Facets,
} from "@yext/search-ui-react";
import Card  from "../components/product-card";

export const getPath: GetPath<TemplateProps> = () => {
  return "search";
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Sunshine Flower Boutique Search Page",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const searcher = provideHeadless({
  apiKey: apiKey,
  experienceKey: experienceKey,
  verticalKey: "products",
  locale: "en",
});

const Search: Template<TemplateRenderProps> = () => {
  return (
    <SearchHeadlessProvider searcher={searcher}>
      <div className="flex justify-center px-4 py-6">
        <div className="w-full max-w-5xl">
          <SearchBar />
          <ResultsCount />
          <AppliedFilters />
          <div className="flex ">
            <Facets customCssClasses={{ facetsContainer: "mr-10" }}/>
            <VerticalResults 
              CardComponent={Card} 
              customCssClasses={{ verticalResultsContainer: "flex-grow md:grid gap-4 grid-cols-3 pb-6" }}
              displayAllOnNoResults={false}
            />
            <Pagination />
          </div>
        </div>
      </div>
    </SearchHeadlessProvider>
  );
};

export default Search;