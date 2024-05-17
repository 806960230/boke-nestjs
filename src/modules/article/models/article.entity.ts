import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
@Entity('article')
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    comment: '标题',
    default: '',
  })
  @IsNotEmpty()
  title: string;
  @Column({
    comment: '内容',
    default: '',
  })
  @IsNotEmpty()
  content: string;
  @Column({
    comment: '发布日期',
    default: '',
  })
  @IsNotEmpty()
  date: string;
}
