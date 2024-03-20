// Function that adds className to all formly fields for styling
export function applyFormlyConfig(schema: any) {
  function traverse(obj: any, key: string) {
    if (typeof obj === 'object') {
      // If the object has a 'type' attribute, add the formlyConfig
      if (obj.hasOwnProperty('type')) {
        obj.widget = {
          ...obj?.widget,
          formlyConfig: {
            ...obj?.widget?.formlyConfig,
            className: `formly-field-${key}`,
            expressions: {
              ...obj?.widget?.formlyConfig?.expressions,
              'props.disabled': 'formState.disabled',
            },
          },
        };
      }
      // Recursively traverse the object's properties
      for (let key in obj) {
        traverse(obj[key], key);
      }
    }
  }

  // Start traversing from the root schema
  traverse(schema, 'root');
  return schema;
}
