// This is the code for the main homepage.
// Its only job is to redirect users to the login page.
import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/login');
}
