import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
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
          <form className='flex flex-col gap-4'>
            <div>
              <Label value = 'Your username' />
              <TextInput type='text' placeholder='Username' id='username'/>
            </div>
            <div>
              <Label value = 'Your email' />
              <TextInput type='text' placeholder='example@company.com' id='email'/>
            </div>
            <div>
              <Label value = 'Your password' />
              <TextInput type='text' placeholder='Password' id='password'/>
            </div>
            <Button className='bg-gradient-to-r from-emerald-500 to to-black' type='submit'>
              Sign Up
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'> 
          <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'> 
              Sign in
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}
