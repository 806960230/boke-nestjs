import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ArticleInput {
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
