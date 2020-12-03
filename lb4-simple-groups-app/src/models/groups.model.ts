import {Entity, model, property} from '@loopback/repository';

@model()
export class Groups extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  campus: string;

  @property({
    type: 'string',
    required: true,
  })
  demographic: string;

  @property({
    type: 'string',
    required: true,
  })
  group_type: string;

  @property({
    type: 'string',
    required: true,
  })
  meeting_date: string;

  @property({
    type: 'number',
    required: true,
  })
  zip_code: number;

  @property({
    type: 'object',
    required: true,
  })
  additionalProp1: object;


  constructor(data?: Partial<Groups>) {
    super(data);
  }
}

export interface GroupsRelations {
  // describe navigational properties here
}

export type GroupsWithRelations = Groups & GroupsRelations;
