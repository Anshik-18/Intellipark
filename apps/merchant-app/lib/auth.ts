import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
            password: { label: "Password", type: "password", required: true },
            name:{label:"name",type:"text",placeholder:"Name",required:true}
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials: any) {
            // Do zod validation, OTP validation here
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            console.log("hi")
            const existingmerchant = await db.merchant.findFirst({
                where: {
                    number: credentials.phone
                }
            });

            if (existingmerchant) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingmerchant.password);
                if (passwordValidation) {
                    return {
                        id: existingmerchant.id.toString(),
                        name: existingmerchant.name,
                        email: existingmerchant.number
                    }
                }
                return null;
            }

            try {
                const merchant = await db.merchant.create({
                    data: {
                        number: credentials.phone,
                        password: hashedPassword,
                        name:credentials.name
                    } 
                });
            
                return {
                    id: merchant.id.toString(),
                    name: merchant.name,
                    email: merchant.number
                }
            } catch(e) {
                console.error(e);
            }

            return null
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub
            return session
        }
    }
  }
  