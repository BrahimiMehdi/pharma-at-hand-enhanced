
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const  extractFirstSubpath = (inputString:string)=> {
  // Split the input string by '/' and take the first two parts
  const parts = inputString.trim().split('/');
  if (parts.length >= 2) {
    return '/' + parts[1];
  } else {
    return inputString;
  }

}

