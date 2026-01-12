import { Search, User } from "lucide-react";
import { useState } from "react";
import { NotificationCenter } from "./NotificationCenter";

interface HeaderAdminProps {
  title: string;
  subtitle?: string;
}

export const HeaderAdmin = ({ title, subtitle }: HeaderAdminProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Title Section */}
        <div className="flex-shrink-0">
          <h1 className="font-serif text-2xl font-semibold text-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="premium-input pl-10 w-64"
            />
          </div>

          {/* Notifications - Real-time */}
          <NotificationCenter />

          {/* User Menu */}
          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <div className="w-10 h-10 rounded-full bg-primary/20 gold-border flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground">Admin</p>
              <p className="text-xs text-muted-foreground">Gestionnaire</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
