// src/templates/search.tsx

import * as React from "react";
import {
  Template,
  GetPath,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TemplateProps,
} from "@yext/pages";
import "../index.css";
import {
  SearchHeadlessProvider,
  provideHeadless,
  HeadlessConfig,
  SandboxEndpoints,
} from "@yext/search-headless-react";
import JobSearch from "../components/JobSearch";
import SearchApiKeyModal from "../components/SearchApiKeyModal";

export const getPath: GetPath<TemplateProps> = () => {
  return "search";
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: `Turtlehead Tacos Search`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const headlessConfig: HeadlessConfig = {
  apiKey: import.meta.env.YEXT_PUBLIC_SEARCH_API_KEY || "",
  experienceKey: "turtlehead",
  locale: "en",
  verticalKey: "jobs",
  // remove this if you are not using a Sandbox account
  endpoints: SandboxEndpoints,
};

const searcher = provideHeadless(headlessConfig);

const Search: Template<TemplateRenderProps> = () => {
  return (
    <SearchHeadlessProvider searcher={searcher}>
      <JobSearch />
      {/* Once you have added your Search API Key, you can remove this component */}
      <SearchApiKeyModal />
    </SearchHeadlessProvider>
  );
};
export default Search;
