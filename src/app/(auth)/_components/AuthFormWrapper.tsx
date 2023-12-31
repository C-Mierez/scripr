import css from "./AuthFormWrapper.module.scss";

interface AuthFormWrapperProps {
    children: React.ReactNode;
}

export default function AuthFormWrapper({ children }: AuthFormWrapperProps) {
    return <section className={css.wrapper}>{children}</section>;
}
