import { normalize, schema } from 'normalizr';

const taxonomySchema = new schema.Entity('taxonomies', {}, {
  idAttribute: taxonomy => taxonomy.name.toLowerCase()
});

const typesSchema = new schema.Entity('types', {

}, {
  idAttribute: type => type.type.toLowerCase()
});

const Schemas = {
  TYPE: typesSchema,
  TYPES: [typesSchema],
  TAXONOMY: taxonomySchema,
  TAXONOMIES: [taxonomySchema]
};

export default Schemas;
