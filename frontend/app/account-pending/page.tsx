import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function AccountPendingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 p-6">
      <div className="max-w-lg w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col items-center border border-primary/20 dark:border-primary/30 animate-fade-in">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
        <h1 className="text-2xl font-bold mb-2 text-center text-primary dark:text-primary-400">Votre compte est en cours de validation</h1>
        <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
          Merci pour votre inscription !<br />
          Votre compte doit être validé par un administrateur avant de pouvoir vous connecter.<br />
          Vous recevrez un email sous 24h dès que votre compte sera activé.
        </p>
        <Link href="/" className="text-primary hover:underline font-semibold transition-colors duration-300">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
} 