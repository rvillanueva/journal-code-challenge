export function applyPatch(entity, updates, options = {}) {
  Object.keys(updates).forEach(key => {
    if(!options.allowedKeys || options.allowedKeys.indexOf(key) > -1 && key !== '_id') {
      entity.set(key, updates[key]);
    }
  });
  return entity;
}
