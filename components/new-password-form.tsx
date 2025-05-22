"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Lock, Eye, EyeOff, CheckCircle, Shield, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function NewPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [tokenError, setTokenError] = useState(false)

  // Verificar que el token existe
  useEffect(() => {
    if (!token) {
      setTokenError(true)
      setError("No se encontró un token válido en la URL. Verifica el enlace de recuperación.")
    }
  }, [token])

  // Validación de contraseña
  const isPasswordValid = password.length >= 8
  const doPasswordsMatch = password === confirmPassword
  const canSubmit = isPasswordValid && doPasswordsMatch && password.length > 0 && !tokenError

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!token) {
      setError("No se encontró un token válido en la URL. Verifica el enlace de recuperación.")
      return
    }

    if (!canSubmit) {
      if (!isPasswordValid) {
        setError("La contraseña debe tener al menos 8 caracteres")
        return
      }
      if (!doPasswordsMatch) {
        setError("Las contraseñas no coinciden")
        return
      }
      return
    }

    setIsLoading(true)

    try {
      // Enviar solicitud al endpoint con el token y la nueva contraseña
      const response = await fetch("https://54.234.86.157/recuperacion_contrasena/api/password_reset/confirm/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          password: password,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al cambiar la contraseña")
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error al cambiar la contraseña. Intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  if (tokenError) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
            <h2 className="text-xl font-semibold">Enlace inválido</h2>
            <p className="text-gray-500">
              El enlace de recuperación de contraseña no es válido o ha expirado. Por favor, solicita un nuevo enlace de
              recuperación.
            </p>
            <Button className="mt-4 bg-red-600 hover:bg-red-700 text-white">Solicitar nuevo enlace</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isSubmitted) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <h2 className="text-xl font-semibold">¡Contraseña actualizada!</h2>
            <p className="text-gray-500">
              Tu contraseña ha sido actualizada correctamente. Ya puedes iniciar sesión con tu nueva contraseña.
            </p>
            <Button className="mt-4 bg-red-600 hover:bg-red-700 text-white">Ir a iniciar sesión</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="mx-auto bg-red-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
          <Lock className="h-6 w-6 text-red-600" />
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium flex items-center justify-between">
                <span>Nueva contraseña</span>
                {password && (
                  <span className={`text-xs ${isPasswordValid ? "text-green-500" : "text-red-500"}`}>
                    {isPasswordValid ? "Válida" : "Mínimo 8 caracteres"}
                  </span>
                )}
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu nueva contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium flex items-center justify-between">
                <span>Confirmar contraseña</span>
                {confirmPassword && (
                  <span className={`text-xs ${doPasswordsMatch ? "text-green-500" : "text-red-500"}`}>
                    {doPasswordsMatch ? "Coincide" : "No coincide"}
                  </span>
                )}
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirma tu nueva contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-gray-400 mt-0.5" />
                <div className="text-sm text-gray-600">
                  <p className="font-medium mb-1">Recomendaciones de seguridad:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Usa al menos 8 caracteres</li>
                    <li>Combina letras mayúsculas y minúsculas</li>
                    <li>Incluye números y símbolos</li>
                    <li>Evita información personal fácil de adivinar</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              disabled={isLoading || !canSubmit}
            >
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
                  Actualizando...
                </span>
              ) : (
                "Cambiar contraseña"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <Button variant="link" className="text-red-600 hover:text-red-700">
          Cancelar y volver
        </Button>
      </CardFooter>
    </Card>
  )
}
