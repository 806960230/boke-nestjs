import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Article } from './models/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private ArticleRepository: Repository<Article>,
  ) {}

  // 新增一篇文章
  async create(entity: DeepPartial<Article>): Promise<boolean> {
    const res = await this.ArticleRepository.insert(entity);
    if (res && res.raw.affectedRows > 0) {
      return true;
    }
    return false;
  }

  // 删除一篇文章
  async del(id: string): Promise<boolean> {
    const res = await this.ArticleRepository.delete(id);
    if (res.affected > 0) {
      return true;
    }
    return false;
  }

  // 更新一篇文章
  async update(id: string, entity: DeepPartial<Article>): Promise<boolean> {
    const res = await this.ArticleRepository.update(id, entity);
    if (res.affected > 0) {
      return true;
    }
    return false;
  }

  // 查询一篇文章
  async find(id: string): Promise<Article> {
    const res = await this.ArticleRepository.findOne({
      where: {
        id,
      },
    });
    console.log('article==========', res);
    return res;
  }

  // 查询文章列表
  async findArticles({
    start,
    length,
  }: {
    start: number;
    length: number;
  }): Promise<[Article[], number]> {
    return this.ArticleRepository.findAndCount({
      take: length,
      skip: start,
    });
  }
}
