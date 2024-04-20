'use client';
import { ILoginFormValue, IRegisterFormValue } from '@juice-wallpaper/types';
import { Button, Modal, TextInput } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { login, register } from '../../actions';

export default function AuthModal() {
  const [opened, { open, close }] = useDisclosure(false);

  const [loading, setLoading] = useState(false);
  const [sendedVerifyCode, setSendedVerifyCode] = useState(false);
  const [countDown, setCountDown] = useState(6);
  const [haveAccount, setHaveAccount] = useState(false);

  const registerForm = useForm({
    validateInputOnBlur: false,
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      verifyCode: '',
      name: '',
    },
    validate: {
      email: isEmail('Invalid email'),
      password: (value) => (value.length >= 1 ? null : 'Password is too short'),
      confirmPassword: (value, values) =>
        value === values.password ? null : 'Passwords do not match',
      verifyCode: (value) =>
        value.length >= 1 ? null : 'Verify code is too short',
      name: (value) => {
        if (value.length === 0) {
          return 'Name is required';
        } else if (value.length > 20) {
          return 'Name is too long';
        }
      },
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

  const onRegister = async (formValue: IRegisterFormValue) => {
    try {
      setLoading(true);
      console.log(formValue);
      await register(formValue);
    } catch (error) {
      console.log('register error', error);
      if (error instanceof Error) {
        notifications.show({
          title: 'Register failed',
          message: error?.message ?? 'Please check your email and password',
          color: 'red',
          radius: 'lg',
        });
      }
    } finally {
      setLoading(false);
    }
  };
  const onLogin = async (values: ILoginFormValue) => {
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
  const onSendVerifyCode = () => {
    setSendedVerifyCode(true);
    const timer = setInterval(() => {
      setCountDown((prev) => {
        const currentCountDown = prev - 1;
        if (currentCountDown === 0) {
          clearInterval(timer);
          setSendedVerifyCode(false);
          return 6;
        }
        return currentCountDown;
      });
    }, 1000);
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
        keepMounted={false}
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
          <form onSubmit={registerForm.onSubmit(onRegister)}>
            <TextInput
              label="Name"
              placeholder="Your name"
              {...registerForm.getInputProps('name')}
            />
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
            <div className="flex items-end gap-2">
              <TextInput
                label="Verify code"
                placeholder="Verify code"
                {...registerForm.getInputProps('verifyCode')}
              />
              <Button
                size="sm"
                onClick={onSendVerifyCode}
                disabled={sendedVerifyCode}
              >
                {sendedVerifyCode ? countDown : 'Send code'}
              </Button>
            </div>
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
