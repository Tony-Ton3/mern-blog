import { Button, Label, TextInput, Alert, Spinner } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: String(e.target.value.trim()) }); //.id represent a input box, .value is the user input
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent refresh everytime signup button is clicked

    if(!formData.email || !formData.password) {
      return setErrorMessage('Please fill in all fields');
    }

    try {
      setLoading(true);
      setErrorMessage(null); //clear error message when page is rerendered 
      const res = await fetch('/api/auth/signin', { //backend url is valid because we set proxy in vite.config.js
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, //using json data
            body: JSON.stringify(formData) //convert json to string before making api call to mongodb
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen mt-20'> 
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>

        {/* info side*/}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-emerald-500 to to-black rounded-lg text-white'>
              Collab
            </span>
            In
          </Link>
          <p className='text-sm mt-5 italic font-bold'>
            Welcome to the trendsetter community
          </p>
        </div>

        {/* input side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value = 'Your email' />
              <TextInput type='email' placeholder='example@company.com' id='email' onChange={handleChange}/>
            </div>
            <div>
              <Label value = 'Your password' />
              <TextInput type='password' placeholder='********' id='password' onChange={handleChange}/>
            </div>
            <div className='flex justify-center'>
              <Button className='w-80 bg-gradient-to-r from-emerald-500 to to-black' type='submit' disabled={loading}>
                {loading ? (
                    <>
                      <Spinner size='sm' />
                      <span className='pl-3'> Loading... </span>
                    </> 
                    ) : (
                      'Sign In'
                    )}
              </Button>
            </div>
          </form>
          <div className='flex gap-2 text-sm mt-5'> 
          <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500'> 
              Sign up
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
