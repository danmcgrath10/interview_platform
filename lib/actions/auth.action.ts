'use server';

import {auth, db} from "@/firebase/admin";
import {cookies} from "next/headers";

const ONE_WEEK = 7 * 24 * 60 * 60;

export async function signUp(params: SignUpParams) {
        const {uid, name, email} = params;

        try {
            const userRecord = await db.collection('users').doc(uid).get();

            if(!userRecord.exists) {
                await db.collection('users').doc(uid).set({
                    name,
                    email
                })
            } else {
                return {
                    success: false,
                    message: 'User already exists, Please sign in instead!'
                }
            }

            return {
                success: true,
                message: 'User created successfully'
            }
        } catch (error) {
            console.log(error);

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if(error.code === 'auth/email-already-in-use') {
                return {
                    success: false,
                    message: 'Email already in use'
                }
            }

            return {
                success: false,
                message: 'Something went wrong'
            }
        }
}

export async function signIn(params: SignInParams) {
    const {email, idToken} = params;

    try {
        const userRecord = await auth.getUserByEmail(email);

        if(!userRecord) {
            return {
                success: false,
                message: 'User does not exist, Please Create Account'
            }
        }

        await setSessionCookie(idToken);

        return {
            success: true,
            message: 'Signed In'
        }
    } catch (error) {
        console.log(error);

        return {
            success: false,
            message: 'Something went wrong, Failed to Log In'
        }
    }
}

export async function setSessionCookie(token: string) {
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(token, {expiresIn: ONE_WEEK * 1000});

    cookieStore.set('session', sessionCookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
        maxAge: ONE_WEEK
    })
}

export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get('session')?.value;

    if(!sessionCookie) {
        return null;
    }

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie);

        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();

        if(!userRecord.exists) {
            return null;
        }

        return {
            ...userRecord.data,
            id: userRecord.id
        } as User
    } catch (error) {
        console.log(error);

        return null;
    }
}

export async function isAuthenticated() {
    const user = await getCurrentUser();

    return !!user;
}