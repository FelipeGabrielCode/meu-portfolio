"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EnterpriseRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar para a página enterprise com locale
    router.replace("/pt/enterprise");
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-400">Redirecionando...</p>
      </div>
    </div>
  );
}
