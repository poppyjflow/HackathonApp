import axios from 'axios';

const loadUserData = async () => {
  try {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const req = await axios.post((`http://localhost:5000/login`),
    {
      email_addy: user.user
    }
    );
console.log(`GOOD: req.data=${JSON.stringify(req.data[0])}`)
    return req.data;
  } catch (error) {
    console.log(`BAD`)
    return ([]);
  }
};

export default loadUserData;