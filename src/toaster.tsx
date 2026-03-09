import React, { useState } from "react"

// 1. الهوك داخلياً (عشان ما يدور على ملفات ثانية)
export const useToast = () => {
  const [toasts, setToasts] = useState<any[]>([])
  return {
    toasts,
    toast: ({ title, description }: { title?: string; description?: string }) => {
      console.log("Toast:", title, description)
    },
  }
}

// 2. الكومبوننت نفسه
export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed bottom-0 right-0 p-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast, index) => (
        <div key={index} className="bg-white border rounded-lg p-4 shadow-lg">
          {toast.title && <div className="font-bold">{toast.title}</div>}
          {toast.description && <div className="text-sm">{toast.description}</div>}
        </div>
      ))}
    </div>
  )
}
