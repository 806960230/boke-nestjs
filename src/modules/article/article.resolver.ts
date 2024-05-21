import { SUCCESS, UPDATE_ERROR } from './../../common/constants/code';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ArticleInput } from './dto/article-input.type';
import { ArticleService } from './article.service';
import { Result } from '../../common/dto/result.type';
import { ArticleResult, ArticleResults } from './dto/result-article.output';
import { PageInput } from 'src/common/dto/page.input';

@Resolver()
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Mutation(() => Boolean, { description: '新增文章' })
  async createArticle(@Args('params') params: ArticleInput): Promise<boolean> {
    return await this.articleService.create(params);
  }

  @Query(() => ArticleResult, { description: '使用 ID 查询文章' })
  async getArticle(@Args('id') id: string): Promise<ArticleResult> {
    const result = await this.articleService.find(id);
    console.log('article', result);
    if (result) {
      return {
        code: SUCCESS,
        data: result,
        message: '获取成功',
      };
    }
    return {
      code: 400,
      message: '信息不存在',
    };
  }

  //   @Query(() => ArticleType, { description: '使用 ID 查询用户' })
  //   async getArticleInfo(@Context() cxt: any): Promise<ArticleType> {
  //     const id = cxt.req.article.id;
  //     return await this.articleService.find(id);
  //   }

  @Mutation(() => Result, { description: '更新文章' })
  async updateArticleInfo(
    @Args('id', { nullable: true }) id: string,
    @Args('params') params: ArticleInput,
  ): Promise<Result> {
    if (!id) {
      const res = await this.articleService.create({ ...params });
      console.log('res========', res);
      if (res) {
        return {
          code: SUCCESS,
          message: '创建成功',
        };
      }
      return {
        code: 400,
        message: '创建失败',
      };
    }
    const article = await this.articleService.find(id);
    if (article) {
      const res = await this.articleService.update(id, params);
      if (res) {
        return {
          code: SUCCESS,
          message: '更新成功',
        };
      }
      return {
        code: UPDATE_ERROR,
        message: '更新失败',
      };
    }
  }

  @Mutation(() => Result, { description: '删除一个文章' })
  async del(@Args('id') id: string): Promise<Result> {
    const res = await this.articleService.del(id);
    if (res) {
      return {
        code: SUCCESS,
        message: '删除成功',
      };
    } else {
      return {
        code: 400,
        message: '删除失败',
      };
    }
  }

  // 查询多个文章列表
  @Query(() => ArticleResults)
  async getArticles(@Args('page') page: PageInput): Promise<ArticleResults> {
    const { pageNum, pageSize } = page;
    const [results, total] = await this.articleService.findArticles({
      start: (pageNum - 1) * pageSize,
      length: pageSize,
    });
    return {
      code: SUCCESS,
      data: results,
      page: {
        pageNum,
        pageSize,
        total,
      },
      message: '获取成功',
    };
  }
}
