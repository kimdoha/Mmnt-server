import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseTimeEntity {
  @ApiProperty()
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
    default: 'CURRENT_TIMESTAMP',
  })
  deletedAt: Date;
}
