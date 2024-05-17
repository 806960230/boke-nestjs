import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ArticleType {
  @Field()
  id: string;
  @Field({
    description: '标题',
  })
  title: string;
  @Field({
    description: '内容',
  })
  content: string;
  @Field({
    description: '发布日期',
  })
  date: string;
}
