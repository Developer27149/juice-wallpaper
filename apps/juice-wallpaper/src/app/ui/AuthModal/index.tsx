'use client';
import { Button, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { login } from '../../actions';

export default function AuthModal() {
  const [opened, { open, close }] = useDisclosure(false);

  const [loading, setLoading] = useState(false);
  const [haveAccount, setHaveAccount] = useState(false);

  const registerForm = useForm({
    validateInputOnBlur: false,
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      verifyCode: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 1 ? null : 'Password is too short'),
      confirmPassword: (value, values) =>
        value === values.password ? null : 'Passwords do not match',
    },
  });

  const loginForm = useForm({
    validateInputOnBlur: false,
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 1 ? null : 'Password is too short'),
    },
  });

  const onRegister = () => {};
  const onLogin = async (values: any) => {
    try {
      setLoading(true);
      console.log(values);
      const result = await login(values);
      if ('message' in result) {
        throw new Error(result.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        notifications.show({
          title: 'Login failed',
          message: error?.message ?? 'Please check your email and password',
          color: 'red',
          radius: 'lg',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          registerForm.reset();
          close();
        }}
        withCloseButton={false}
      >
        <section className="text-center p-4 font-semibold text-xl">
          {haveAccount ? 'Login in' : 'Register a new account'}
        </section>
        {haveAccount ? (
          <form onSubmit={loginForm.onSubmit(onLogin)}>
            <TextInput
              label="Email"
              placeholder="Your email"
              {...loginForm.getInputProps('email')}
            />
            <TextInput
              label="Password"
              placeholder="Your password"
              type="password"
              {...loginForm.getInputProps('password')}
            />

            <div className="flex justify-between items-center gap-4 mt-8">
              {/* change to login */}
              <Button
                size="sm"
                variant="transparent"
                onClick={(e) => {
                  e.stopPropagation();
                  setHaveAccount(false);
                }}
              >
                Register a new account
              </Button>
              <Button type="submit" loading={loading} size="sm" variant="light">
                Submit
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={registerForm.onSubmit(console.log)}>
            <TextInput
              label="Email"
              placeholder="Your email"
              {...registerForm.getInputProps('email')}
            />
            <TextInput
              label="Password"
              placeholder="Your password"
              type="password"
              {...registerForm.getInputProps('password')}
            />
            <TextInput
              label="Confirm password"
              placeholder="Confirm password"
              type="password"
              {...registerForm.getInputProps('confirmPassword')}
            />
            <TextInput
              label="Verify code"
              placeholder="Verify code"
              {...registerForm.getInputProps('verifyCode')}
            />
            <div className="flex justify-between items-center gap-4 mt-8">
              {/* change to login */}
              <Button
                size="sm"
                variant="transparent"
                onClick={(e) => {
                  e.stopPropagation();
                  setHaveAccount(true);
                }}
              >
                I have an account
              </Button>
              <Button type="submit" loading={loading} size="sm" variant="light">
                Submit
              </Button>
            </div>
          </form>
        )}
      </Modal>

      <Button variant="light" size="sm" onClick={open}>
        Login or register
      </Button>
    </>
  );
}
