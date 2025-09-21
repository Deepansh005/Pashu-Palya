"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage, type Language } from "@/lib/language"
import { Globe, Loader2 } from "lucide-react"

const languages = [
  { code: "en" as Language, name: "English", flag: "🇺🇸" },
  { code: "hi" as Language, name: "हिंदी", flag: "🇮🇳" },
  { code: "mr" as Language, name: "मराठी", flag: "🇮🇳" },
]

export function LanguageSwitcher() {
  const { language, setLanguage, isLoading } = useLanguage()

  return (
    <div className="flex items-center gap-2">
      {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger className="w-[140px]">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              <div className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
