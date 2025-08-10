'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { toast } from 'sonner'

const formSchema = z.object({
  email: z
    .string()
    .min(6, { message: 'Email must be at least 6 characters' })
    .email({ message: 'Please enter a valid email address' }),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter' })
    .regex(/\d/, { message: 'Password must contain at least one number' }),
})

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch('/my-route/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const result = await res.json()

      if (res.ok) {
        console.log('Login success:', result)
        toast.success('Logged in successfully')
        router.push('/')
        return
      } else {
        const err = await res.json()
        console.error('Login failed:', err)
        toast.error('Login failed')
      }
    } catch (err) {
      console.error('Login error:', err)
      alert('An error occurred during login.')
    }
  }

  return (
    <Form {...form}>
      <Card className="md:w-[400px] max-w-full mx-auto">
        <CardHeader>
          <CardTitle className="font-bold text-xl">Welcome</CardTitle>
          <p className="text-cyan-900">Please login here</p>
          <CardDescription>
            A secure login form featuring validated email and password fields, a password visibility
            toggle, and automatic redirection upon successful authentication.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="user@email.com" type="email" {...field} />
                  </FormControl>
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
                    <div className="relative">
                      <Input
                        placeholder="********"
                        type={showPassword ? 'text' : 'password'}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link href="/forgot-password" className="underline hover:text-cyan-900 mt-2">
              Forgot Password?
            </Link>

            <div className="flex justify-between items-center">
              <Button type="submit">LOGIN</Button>
              <Link href="/create-account" className="underline hover:text-cyan-900">
                Create an account
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </Form>
  )
}
