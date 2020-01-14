
export const user = function(normalizer) {
  return normalizer.define('users', {});
};

export const account = function(normalizer) {
  return normalizer.define('accounts', {});
};

export const accountPermission = function(normalizer) {
  return normalizer.define('accountPermissions', {
    account: 'accounts',
    user: 'users'
  });
};
