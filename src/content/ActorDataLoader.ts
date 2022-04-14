import JSONSchemaValidator from 'ajv';
import { ActorData, ActorDataSchema } from '../actors/Actor';
import * as constants from '../constants';
import { ContentItemLoader } from './Content';
import { JSONLoader } from './JSONLoader';

export const ActorDataLoader: ContentItemLoader = async (
  url: string
): Promise<any> => {
  const data = await JSONLoader<ActorData>(url);
  const validate = new JSONSchemaValidator().compile(ActorDataSchema);
  if (!validate(data)) {
    constants.DEBUG && console.log(validate.errors);
    throw new Error(`Invalid actor data: ${url}`);
  }
  return data;
};
