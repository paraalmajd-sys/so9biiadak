import React, { useRef, useEffect } from 'react';
import { SellerNotification } from '../types';
import {
  Bell,
  ShoppingBag,
  MessageCircle,
  TrendingUp,
  CheckCheck,
  Trash2,
  CheckCircle,
} from 'lucide-react';

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: SellerNotification[];
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onSelectNotification: (notif: SellerNotification) => void;
}

export const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onClearAll,
  onSelectNotification,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200/90 z-50 text-right overflow-hidden animate-in fade-in zoom-in-95 duration-150"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-200/80 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-600" />
          <span className="font-bold text-xs text-slate-900">
            إشعارات المتجر والطلبيات
          </span>
          {unreadCount > 0 && (
            <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full tabular-nums">
              {unreadCount} جديد
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              title="تعليم الكل كمقروء"
              className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>كمقروء</span>
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={onClearAll}
              title="مسح الإشعارات"
              className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-slate-400 space-y-1">
            <Bell className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-xs font-bold text-slate-600">لا توجد إشعارات حالياً</p>
            <p className="text-[11px] text-slate-400">
              ستصلك هنا إشعارات فورية بكل طلبية جديدة أو استفسار واتساب.
            </p>
          </div>
        ) : (
          notifications.map((notif) => {
            const getIcon = () => {
              switch (notif.type) {
                case 'order':
                  return (
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                  );
                case 'lead':
                  return (
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                  );
                case 'ad_performance':
                  return (
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                  );
                default:
                  return (
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  );
              }
            };

            return (
              <div
                key={notif.id}
                onClick={() => onSelectNotification(notif)}
                className={`p-3 flex items-start gap-3 hover:bg-slate-50 cursor-pointer transition-colors ${
                  !notif.read ? 'bg-blue-50/50' : ''
                }`}
              >
                {getIcon()}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="font-bold text-xs text-slate-900 truncate">
                      {notif.title}
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0 tabular-nums">
                      {notif.timeAgo}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">
                    {notif.message}
                  </p>
                </div>
                {!notif.read && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 self-center" />
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
        <span className="text-[11px] text-slate-500">
          تنبيهات تلقائية مربوطة بنظام إعلانات سوق في يدك
        </span>
      </div>
    </div>
  );
};
