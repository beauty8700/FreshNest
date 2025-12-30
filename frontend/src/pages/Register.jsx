import API from '../services/api';

export default function Register() {
  const register = async () => {
    await API.post('/auth/register', {
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
      phone: '9999999999'
    });
    alert('Registered');
  };

  return <button onClick={register}>Register</button>;
}
