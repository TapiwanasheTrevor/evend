import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Mock authentication - in production, validate against database
        if (
          credentials?.email === "admin@powertel.co.zw" &&
          credentials?.password === "admin123"
        ) {
          return {
            id: "1",
            email: "admin@powertel.co.zw",
            name: "John Admin",
            role: "admin"
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string || token.sub!
        session.user.role = token.role as string
      }
      return session
    },
  },
}