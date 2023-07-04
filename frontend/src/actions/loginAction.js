import axios from 'axios';
import { SHA256, enc } from 'crypto-js';

const loginAction = async ({ request }) => {
  const { email, password } = Object.fromEntries(await request?.formData());
  console.log(`'From the route action: ' ${email}, ${password}`);

  const hashPassword = (password, hashedPass) => {
    //Rick: pass1: e6c3da5b206634d7f3f3586d747ffdb36b5c675757b380c6a5fe5c570c714349
    //Morty: pass2: 1ba3d16e9881959f8c9a9762854f72c6e6321cdd44358a10a4e939033117eab9
    //Glootie and others: pass3: 3acb59306ef6e660cf832d1d34c4fba3d88d616f0bb5c2a9e0f82d18ef6fc167
    const passInput = SHA256(password).toString(enc.Hex);

    if (hashedPass === passInput) {
      return hashedPass;
    } else {
      return false;
    }
  }

  const token = await axios.post(('http://localhost:5000/login'),
    {
      email_addy: email
    }
  );

  const hashedPwd = hashPassword(password, token.data.passwd);

  if (hashedPwd) {
    sessionStorage.setItem('user', JSON.stringify({ auth: hashedPwd, user: email, id: token.data.id }));
    return {
      auth: hashedPwd,
      user: email,
      id: token.data.id,
    };
  }
  return null;
};

export default loginAction;