import { Shield, Award, CreditCard, Lock } from "lucide-react";

export function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-6 border-t border-b border-muted">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Shield className="h-5 w-5 text-green-500" />
        <span>Pago Seguro</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Lock className="h-5 w-5 text-blue-500" />
        <span>Datos Protegidos</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Award className="h-5 w-5 text-amber-500" />
        <span>Contenido de Calidad</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CreditCard className="h-5 w-5 text-purple-500" />
        <span>Múltiples Métodos de Pago</span>
      </div>
    </div>
  );
}
