import {DefaultCrudRepository} from '@loopback/repository';
import {Groups, GroupsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class GroupsRepository extends DefaultCrudRepository<
  Groups,
  typeof Groups.prototype.id,
  GroupsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Groups, dataSource);
  }
}
