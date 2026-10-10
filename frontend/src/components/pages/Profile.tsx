import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Camera, Loader2, UserRound } from "lucide-react";
import { toast } from "react-toastify";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
        setName(parsedUser.name || "");
        setPreview(parsedUser.avatar || "");
      } catch {
        toast.error("Could not load your profile.");
      }
    }

    setLoading(false);
  }, []);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be under 5 MB.");
      return;
    }

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("name", name.trim());

      if (avatar) {
        formData.append("avatar", avatar);
      }

      const token = localStorage.getItem("token");

      const { data } = await api.patch("/users/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedUser = data.user as User;

      setUser(updatedUser);
      setName(updatedUser.name);
      setPreview(updatedUser.avatar || "");
      setAvatar(null);

      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success(data.message || "Profile updated successfully.");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage your personal information and profile picture.
        </p>
      </div>

      <div className="bg-card rounded-xl border p-5 shadow-sm sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="relative">
              <Avatar className="h-24 w-24 border">
                <AvatarImage src={preview} alt={name || "Profile"} />
                <AvatarFallback>
                  <UserRound className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>

              <label
                htmlFor="avatar-upload"
                className="bg-background hover:bg-muted absolute right-0 bottom-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border shadow-sm"
                title="Change profile picture"
              >
                <Camera className="h-4 w-4" />
              </label>

              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            <div className="text-center sm:text-left">
              <h2 className="font-semibold">{name || "Your name"}</h2>
              <p className="text-muted-foreground text-sm">{user?.email}</p>
              <p className="text-muted-foreground mt-1 text-xs">
                JPG, PNG or other image formats · Max 5 MB
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              maxLength={100}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              value={user?.email || ""}
              readOnly
              className="bg-muted"
            />
            <p className="text-muted-foreground text-xs">
              Email address cannot be changed here.
            </p>
          </div>

          <div className="flex justify-end border-t pt-5">
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
