export function getUserIdByToken({ tokenParam }) {
  const token = Buffer.alloc(tokenParam, 'base64').toString('ascii');
  const [user] = token.split('//');
  return user;
}

export function sendWhatsappMessage({ phone, helperName, helpedName }) {
  const uri = 'https://api.whatsapp.com/send?';
  const phoneHelped = phone;
  const text = `&text=Ol%C3%A1%2C%20${helpedName}%20tudo%20bem%3F%20Eu%20aceitei%20sua%20corrida%20no%20help-me%20Delivery.%20Meu%20nome%20%C3%A9%20${helperName}.%20Qualquer%20d%C3%BAvida%20fico%20a%20sua%20disposi%C3%A7%C3%A3o.%20Segue%20abaixo%20o%20link%20com%20meus%20dados.`;
  return `${uri + phoneHelped + text}`;
}
