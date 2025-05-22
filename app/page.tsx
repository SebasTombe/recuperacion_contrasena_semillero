import NewPasswordForm from "@/components/new-password-form"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Establece tu nueva contraseña</h1>
          <p className="text-gray-500 mt-2">Crea una contraseña segura para tu cuenta</p>
        </div>
        <NewPasswordForm />
      </div>
    </main>
  )
}
