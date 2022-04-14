import * as uuid from 'uuid-random';

export type EntityData = {
  id: string;
  name: string;
};

export const EntityDataSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
  },
  additionalProperties: false,
};

export default class Entity {
  public id: string;
  public name: string;

  public constructor(
    id: string | null,
    name: string
  ) {
    this.id = id ?? uuid();
    this.name = name;
  }

  public serialize(): EntityData {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
