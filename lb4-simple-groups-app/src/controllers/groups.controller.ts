import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Groups} from '../models';
import {GroupsRepository} from '../repositories';

export class GroupsController {
  constructor(
    @repository(GroupsRepository)
    public groupsRepository : GroupsRepository,
  ) {}

  @post('/groups', {
    responses: {
      '200': {
        description: 'Groups model instance',
        content: {'application/json': {schema: getModelSchemaRef(Groups)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Groups, {
            title: 'NewGroups',
            exclude: ['id'],
          }),
        },
      },
    })
    groups: Omit<Groups, 'id'>,
  ): Promise<Groups> {
    return this.groupsRepository.create(groups);
  }

  @get('/groups/count', {
    responses: {
      '200': {
        description: 'Groups model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Groups) where?: Where<Groups>,
  ): Promise<Count> {
    return this.groupsRepository.count(where);
  }

  @get('/groups', {
    responses: {
      '200': {
        description: 'Array of Groups model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Groups, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Groups) filter?: Filter<Groups>,
  ): Promise<Groups[]> {
    return this.groupsRepository.find(filter);
  }

  @patch('/groups', {
    responses: {
      '200': {
        description: 'Groups PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Groups, {partial: true}),
        },
      },
    })
    groups: Groups,
    @param.where(Groups) where?: Where<Groups>,
  ): Promise<Count> {
    return this.groupsRepository.updateAll(groups, where);
  }

  @get('/groups/{id}', {
    responses: {
      '200': {
        description: 'Groups model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Groups, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Groups, {exclude: 'where'}) filter?: FilterExcludingWhere<Groups>
  ): Promise<Groups> {
    return this.groupsRepository.findById(id, filter);
  }

  @patch('/groups/{id}', {
    responses: {
      '204': {
        description: 'Groups PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Groups, {partial: true}),
        },
      },
    })
    groups: Groups,
  ): Promise<void> {
    await this.groupsRepository.updateById(id, groups);
  }

  @put('/groups/{id}', {
    responses: {
      '204': {
        description: 'Groups PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() groups: Groups,
  ): Promise<void> {
    await this.groupsRepository.replaceById(id, groups);
  }

  @del('/groups/{id}', {
    responses: {
      '204': {
        description: 'Groups DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.groupsRepository.deleteById(id);
  }
}
