'use strict';

export async function testErrorHandling(req, res, next) {
  try {
    throw new Error('Test error.');
  } catch(e) {
    return next(e);
  }
}
