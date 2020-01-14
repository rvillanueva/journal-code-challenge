import AWS from 'aws-sdk';

const ses = new AWS.SES();

export function sendEmail(params) {
  return new Promise((resolve, reject) => {
    ses.sendEmail(params, function(err, data) {
      if(err) {
        console.error(err, err.stack);
        return reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
