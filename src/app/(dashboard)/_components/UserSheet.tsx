import LogOutButton from "@/components/shared/LogOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { HomeIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import useSessionUser from "~/hooks/useSessionUser";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

export default function UserSheet() {
    const user = useSessionUser();
    const { update: updateSession } = useSession();

    const { mutateAsync: mutateUpdateTwoFactor, isLoading: isLoadingTwoFactor } = api.auth.updateTwoFactor.useMutation({
        onSuccess: () => {
            updateSession();
        },
    });
    const { setTheme, resolvedTheme } = useTheme();
    return (
        <Sheet>
            <SheetTrigger asChild className="cursor-pointer">
                <Avatar>
                    <AvatarImage src="https://github.com/c-mierez.png" />
                    <AvatarFallback></AvatarFallback>
                </Avatar>
            </SheetTrigger>
            <SheetContent className="rounded-l-xl">
                <SheetHeader>
                    <SheetTitle>Your Profile</SheetTitle>
                    <Separator />
                    <div className="flex flex-col items-center gap-4 py-4">
                        <Avatar className="h-[8lvh] w-[8lvh]">
                            <AvatarImage src="https://github.com/c-mierez.png" />
                            <AvatarFallback></AvatarFallback>
                        </Avatar>
                        <div className="text-center text-muted capitalize ">
                            <p className="text-xs">Welcome</p>
                            <p className="text-base text-foreground font-[var(--fw-medium)]">{user?.name}</p>
                        </div>
                    </div>
                </SheetHeader>

                <div className="flex flex-col gap-4">
                    <div>
                        <SheetTitle>Account</SheetTitle>
                        <Separator className="my-2" />
                    </div>
                    <div className="flex justify-between items-center gap-2">
                        <div className="text-xs text-muted flex flex-col gap-1.5">
                            <p className="text-foreground font-[var(--fw-medium)]">Email</p>
                            <p>{user?.email}</p>
                        </div>
                        <Button variant="outline" size="sm">
                            Change
                        </Button>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                        <div className="text-xs text-muted flex flex-col gap-1.5">
                            <p className="text-foreground font-[var(--fw-medium)]">2-Factor Verification</p>
                            <p>Add an additional step to your log in.</p>
                        </div>
                        <Switch
                            checked={user?.isTwoFactorEnabled!}
                            defaultChecked={user?.isTwoFactorEnabled!}
                            onCheckedChange={(checked) => {
                                mutateUpdateTwoFactor(checked);
                            }}
                            disabled={isLoadingTwoFactor}
                        />
                    </div>
                    <div>
                        <SheetTitle>Settings</SheetTitle>
                        <Separator className="my-2" />
                    </div>
                    <div className="flex justify-between items-center gap-2">
                        <div className="text-xs text-muted flex flex-col gap-1.5">
                            <p className="text-foreground font-[var(--fw-medium)]">Theme</p>
                            <p>Customize how Scripr looks.</p>
                        </div>
                        <Select
                            onValueChange={(value) => {
                                setTheme(value);
                            }}
                        >
                            <SelectTrigger className="w-fit">
                                <SelectValue
                                    placeholder={`${resolvedTheme?.charAt(0).toUpperCase()}${resolvedTheme?.slice(1)}`}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">
                                    <div className="flex gap-[1ch] items-center w-fit">
                                        <SunIcon className="w-3 h-3" />
                                        Light
                                    </div>
                                </SelectItem>
                                <SelectItem value="dark">
                                    <div className="flex gap-[1ch] items-center w-fit">
                                        <MoonIcon className="w-3 h-3" />
                                        Dark
                                    </div>
                                </SelectItem>
                                <SelectItem value="system">
                                    <div className="flex gap-[1ch] items-center w-fit">
                                        <HomeIcon className="w-3 h-3" />
                                        System
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                        <div className="text-xs text-muted flex flex-col gap-1.5">
                            <p className="text-foreground font-[var(--fw-medium)]">Log Out</p>
                            <p>Conclude your current session.</p>
                        </div>
                        <LogOutButton>
                            <Button variant="default" size="sm">
                                Log Out
                            </Button>
                        </LogOutButton>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
