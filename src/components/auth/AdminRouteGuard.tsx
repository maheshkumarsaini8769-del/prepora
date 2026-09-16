import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { adminAuthorityService } from '../../services/adminAuthorityService';
import { ShieldAlert, ArrowLeft, LogOut } from 'lucide-react';
import { Button, Card, Badge } from '../common/UIComponents';

export const AdminRouteGuard: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // 1. If not logged in, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // 2. Check if user's email has admin authority
  const userEmail = user?.email || '';
  const isAuthorized = adminAuthorityService.isAuthorizedAdmin(userEmail);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full z-10 animate-in fade-in zoom-in-95 duration-200">
          <Card className="bg-slate-900 border border-slate-800 text-center p-8 space-y-6 shadow-2xl backdrop-blur-xl">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mx-auto flex items-center justify-center shadow-inner">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <Badge variant="danger" className="px-3 py-1 text-xs uppercase tracking-wider font-bold">
                403 Forbidden Access
              </Badge>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Admin Console Restricted
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                You do not have administrative authority to access this portal. Only email addresses authorized by the Super Admin can view the Admin Console.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-left space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Current Logged-in Identity:
              </div>
              <div className="text-xs font-mono font-bold text-slate-200 truncate">
                {userEmail || 'Anonymous Session'}
              </div>
              <div className="text-[11px] text-rose-400 font-medium pt-1">
                Status: Not in authorized administrator whitelist
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <Button
                variant="primary"
                className="w-full font-bold text-xs py-2.5"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Return to Student Portal
              </Button>

              <button
                type="button"
                onClick={async () => {
                  await logout();
                  navigate('/login?redirect=/admin');
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-slate-400 hover:text-white transition"
              >
                <LogOut className="w-3.5 h-3.5" /> Switch Account (Sign In as Admin)
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // 3. User is authorized, render children
  return <>{children}</>;
};

export default AdminRouteGuard;
