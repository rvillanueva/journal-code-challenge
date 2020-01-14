import {ErrorResponse} from '../utils/error';

export function respondWithError(res, err, statusCode) {
  const errorResponse = new ErrorResponse(err);
  if(!statusCode || statusCode === 500) {
    console.error(err);
  }
  return res.status(statusCode || 500).json({
    error: errorResponse.toJSON()
  });
}

// Use to type check results, options to add metadata
export function respondWithResult(res, results) {
  return res.status(200).json(results);
}
