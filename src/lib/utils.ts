import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import PocketBase from 'pocketbase'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const pb = new PocketBase('https://genaiedu.pockethost.io/');