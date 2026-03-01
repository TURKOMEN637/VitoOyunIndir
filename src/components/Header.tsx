import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth, getAvatarUrl } from "@/hooks/useAuth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

const tabs = [
  { label: "Oyunlar", path: "/oyunlar/" },
  { label: "Uygulamalar", path: "/uygulamalar/" },
  { label: "Türkçe Yamalar", path: "/turkce-yamalar/" },
  { label: "İstekler", path: "/istekler/" },
  { label: "Şikayetler", path: "/sikayetler/" },
];

export default function Header() {
  const { user, profile, loading, isAdmin, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const avatarUrl = profile ? getAvatarUrl(profile.avatar_url) : null;

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/oyunlar/" className="text-lg font-bold text-primary">
            Vito Oyun İndir
          </Link>
          <div className="flex items-center gap-2">
            {!loading && (
              user ? (
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    {avatarUrl && <AvatarImage src={avatarUrl} alt={profile?.username} />}
                    <AvatarFallback className="text-xs">
                      {profile?.username?.slice(0, 2).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-foreground font-medium hidden sm:inline">
                    {profile?.username}
                  </span>
                  {isAdmin && (
                    <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                      Admin
                    </span>
                  )}
                  <Button variant="ghost" size="icon" onClick={signOut}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => navigate("/giris-yap/")}>
                    Giriş Yap
                  </Button>
                  <Button size="sm" onClick={() => navigate("/hesap-olustur/")}>
                    Hesap Oluştur
                  </Button>
                </div>
              )
            )}
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto pb-2 -mb-px">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`px-3 py-2 text-sm font-medium rounded-t-md whitespace-nowrap ${
                location.pathname === tab.path
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
