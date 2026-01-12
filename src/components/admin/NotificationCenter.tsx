import { useState, useEffect } from "react";
import { Bell, X, Check, AlertTriangle, CreditCard, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface Notification {
  id: string;
  type: 'versement' | 'alerte' | 'rapport' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

// Initial mock notifications
const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'versement',
    title: 'Nouveau versement reçu',
    message: 'Yao Koffi a effectué un versement de 125,000 FC',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
  },
  {
    id: '2',
    type: 'alerte',
    title: 'Véhicule en maintenance',
    message: 'Audi A6 - CI-GHI-9012 nécessite une révision',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
  },
  {
    id: '3',
    type: 'rapport',
    title: 'Rapport en attente',
    message: 'BMW Série 5 - Nouveau rapport à valider',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: true,
  },
];

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotificationTypes = [
        {
          type: 'versement' as const,
          titles: ['Nouveau versement reçu', 'Versement validé', 'Versement en attente'],
          messages: [
            'Boubacar Diarrassouba a effectué un versement de 98,000 FC',
            'Souleymane Coulibaly a effectué un versement de 110,000 FC',
            'Nouveau versement de 85,000 FC en attente de validation',
          ],
        },
        {
          type: 'alerte' as const,
          titles: ['Alerte véhicule', 'Maintenance requise', 'Attention'],
          messages: [
            'Mercedes Classe S nécessite un contrôle technique',
            'Niveau carburant bas sur Tesla Model S',
            'Kilométrage élevé sur BMW Série 5',
          ],
        },
      ];

      const randomType = newNotificationTypes[Math.floor(Math.random() * newNotificationTypes.length)];
      const randomTitle = randomType.titles[Math.floor(Math.random() * randomType.titles.length)];
      const randomMessage = randomType.messages[Math.floor(Math.random() * randomType.messages.length)];

      const newNotification: Notification = {
        id: `notif-${Date.now()}`,
        type: randomType.type,
        title: randomTitle,
        message: randomMessage,
        timestamp: new Date(),
        read: false,
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
    }, 45000); // New notification every 45 seconds

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'versement':
        return <CreditCard className="w-4 h-4" />;
      case 'alerte':
        return <AlertTriangle className="w-4 h-4" />;
      case 'rapport':
        return <Clock className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getIconColor = (type: Notification['type']) => {
    switch (type) {
      case 'versement':
        return 'text-success bg-success/20';
      case 'alerte':
        return 'text-warning bg-warning/20';
      case 'rapport':
        return 'text-primary bg-primary/20';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return "À l'instant";
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors group">
          <Bell className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-96 p-0 bg-card border border-border shadow-elevated"
        align="end"
        sideOffset={8}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h3 className="font-serif font-semibold text-foreground">Notifications</h3>
            <p className="text-xs text-muted-foreground">
              {unreadCount} non lue{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Tout marquer comme lu
            </button>
          )}
        </div>

        {/* Notification List */}
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Aucune notification</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "flex gap-3 p-4 border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer group",
                  !notification.read && "bg-primary/5"
                )}
                onClick={() => markAsRead(notification.id)}
              >
                <div className={cn("p-2 rounded-lg flex-shrink-0", getIconColor(notification.type))}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn(
                      "text-sm truncate",
                      !notification.read ? "font-semibold text-foreground" : "text-muted-foreground"
                    )}>
                      {notification.title}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notification.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-muted rounded transition-all"
                    >
                      <X className="w-3 h-3 text-muted-foreground" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    {formatTime(notification.timestamp)}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-3 border-t border-border">
            <button className="w-full text-center text-sm text-primary hover:text-primary/80 transition-colors font-medium py-2">
              Voir toutes les notifications
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
