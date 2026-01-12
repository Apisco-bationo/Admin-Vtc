import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Car, Eye, EyeOff } from "lucide-react";
import { ActionButton } from "@/components/admin/ActionButton";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    navigate("/admin");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary shadow-gold mb-6">
            <Car className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
            VTC Admin
          </h1>
          <p className="text-muted-foreground">
            Connectez-vous à votre espace de gestion
          </p>
        </div>

        {/* Login Form */}
        <div className="card-premium rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vtc.com"
                className="premium-input w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="premium-input w-full pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border bg-input text-primary focus:ring-primary"
                />
                Se souvenir de moi
              </label>
              <a href="#" className="text-primary hover:underline">
                Mot de passe oublié ?
              </a>
            </div>

            <ActionButton
              label={isLoading ? "Connexion..." : "Se connecter"}
              variant="primary"
              size="lg"
              disabled={isLoading}
              className="w-full"
              onClick={() => {}}
            />
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          © 2024 VTC Admin. Tous droits réservés.
        </p>
      </div>
    </div>
  );
};

export default Login;
