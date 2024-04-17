import { logOut } from "actions/auth";

interface LogOutButtonProps {
    children: React.ReactNode;
}

export default function LogOutButton({ children }: LogOutButtonProps) {
    return (
        <span
            onClick={() => {
                logOut();
            }}
        >
            {children}
        </span>
    );
}
