import { ObjectType } from '@nestjs/graphql';

import { createResult, createResults } from '../../../common/dto/result.type';
import { ArticleType } from './article.type';

@ObjectType()
export class ArticleResult extends createResult(ArticleType) {}

@ObjectType()
export class ArticleResults extends createResults(ArticleType) {}
