export async function sequentiallyDelete(functionsToRun, connectionId, limit, totalRowsDeleted) {
  totalRowsDeleted = totalRowsDeleted || 0;
  if(functionsToRun.length === 0) {
    return true;
  } else {
    const nextFunc = functionsToRun[0];
    const queryResponse = await nextFunc(connectionId, limit);
    const rowsDeleted = queryResponse[1].rowCount;
    totalRowsDeleted += rowsDeleted;
    if(rowsDeleted < limit) {
      return sequentiallyDelete(functionsToRun.slice(1), connectionId, limit, totalRowsDeleted);
    }
    return false;
  }
}
