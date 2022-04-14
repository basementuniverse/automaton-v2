import * as uuid from 'uuid-random';

export type ActorData = {
  id: string;
  name: string;
};

export const ActorDataSchema = {
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

export default abstract class Actor {
  public id: string;
  public name: string;

  public constructor(
    id: string | null,
    name: string
  ) {
    this.id = id ?? uuid();
    this.name = name;
  }

  public serialize(): ActorData {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
