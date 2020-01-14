import emailParser from 'email-addresses';

export function parse(str) {
  const res = emailParser.parseOneAddress(str);
  if(!res) {
    return {
      name: null,
      email: null,
      type: 'error',
      input: str
    };
  }
  return {
    name: res.name,
    type: 'email',
    email: res.address,
    input: str
  };
}
