import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface Profile {
  id: string;
  username: string;
  avatar_url: string | null;
  password_hash: string;
}

interface AuthCtx {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthCtx>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  signOut: async () => {},
  refreshProfile: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

// Cache profiles in memory
const profileCache = new Map<string, Profile>();

export async function fetchProfileByUsername(username: string): Promise<Profile | null> {
  if (profileCache.has(username)) return profileCache.get(username)!;
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .maybeSingle();
  if (data) profileCache.set(data.username, data);
  return data;
}

export async function fetchProfileById(id: string): Promise<Profile | null> {
  const cached = Array.from(profileCache.values()).find((p) => p.id === id);
  if (cached) return cached;
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (data) profileCache.set(data.username, data);
  return data;
}

export function getAvatarUrl(avatarUrl: string | null): string | null {
  if (!avatarUrl) return null;
  if (avatarUrl.startsWith("http")) return avatarUrl;
  const { data } = supabase.storage.from("avatars").getPublicUrl(avatarUrl);
  return data?.publicUrl || null;
}

const ADMIN_USERNAMES = ["ZwonNmvp77", "Vito Oyun İndir"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (userId: string) => {
    const p = await fetchProfileById(userId);
    setProfile(p);
  }, []);

  useEffect(() => {
    // Fast session restore from localStorage
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        loadProfile(u.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        loadProfile(u.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [loadProfile]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    if (user) {
      profileCache.clear();
      await loadProfile(user.id);
    }
  };

  const isAdmin = profile ? ADMIN_USERNAMES.includes(profile.username) : false;

  return (
    <AuthContext.Provider value={{ user, profile, loading, isAdmin, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
