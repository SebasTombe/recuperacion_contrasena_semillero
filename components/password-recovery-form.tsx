"use client"

import type React from "react"

import { useState } from "react"
import { Mail, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function PasswordRecoveryForm() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulación de envío
    try {
      // Aquí iría la lógica real para enviar el correo de recuperación
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
    } catch{
      setError("Ocurrió un error al enviar el correo. Intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <h2 className="text-xl font-semibold">Correo enviado</h2>
            <p className="text-gray-500">
              Hemos enviado un correo a <span className="font-medium">{email}</span> con instrucciones para recuperar tu
              contraseña.
            </p>
            <Button onClick={() => setIsSubmitted(false)} className="mt-4 bg-red-600 hover:bg-red-700 text-white">
              Volver
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="mx-auto bg-red-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
          <Mail className="h-6 w-6 text-red-600" />
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Correo Electrónico
              </label>
              <Input
                id="email"
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Enviando...
                </span>
              ) : (
                <span className="flex items-center">
                  Recuperar contraseña
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <Button variant="link" className="text-red-600 hover:text-red-700">
          Volver al inicio de sesión
        </Button>
      </CardFooter>
    </Card>
  )
}
