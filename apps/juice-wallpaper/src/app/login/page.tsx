'use client';

import { Form } from '@juice-wallpaper/ui-components';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Button,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@juice-wallpaper/ui-components';

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(6).max(50),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('submit', values);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-semibold pt-12">Login to your Account</h1>
      <p className="opacity-50 my-6">
        It's time to find the next great wallpaper for your electronic screens
      </p>
      <div className="flex gap-4 items-center">
        <div className="w-[400px] border rounded-md p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="hi!" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
        <span>🚀</span>
        <div className="w-[200px] flex flex-col gap-2">
          <a
            href="#"
            className="p-[2px] from-green-50 to-yellow-200 bg-gradient-to-br  rounded-[4px] shadow-sm"
          >
            <div className="flex items-center gap-2 p-2 px-2 rounded-sm">
              <i className="i-logos-google-icon"></i>
              <span>Login with Google</span>
            </div>
          </a>

          <div className="p-[2px] from-yellow-300 to-green-100 bg-gradient-to-br rounded-[4px]">
            <a
              href="#"
              className="bg-white text-gray-900 flex items-center gap-2 p-2 px-2 rounded-sm"
            >
              <i className="i-logos-github-icon"></i>
              <span>Login with Github</span>
            </a>
          </div>

          <div className="p-[2px] from-green-400 to-yellow-300 bg-gradient-to-br rounded-[4px]">
            <a
              href="#"
              className="bg-white text-gray-900 flex items-center gap-2 p-2 px-2 rounded-sm"
            >
              <i className="i-logos-apple"></i>
              <span>Login with Github</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
