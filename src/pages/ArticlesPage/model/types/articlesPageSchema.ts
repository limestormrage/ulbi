import { EntityState } from "@reduxjs/toolkit";
import { Article, ArticleView } from "entities/Article";

export interface articlesPageSchema extends EntityState<Article> {
  isLoading: boolean;
  error: string | null;
  view: ArticleView;
  page: number;
  limit: number;
  hasMore: boolean;

  _inited: boolean;
}
