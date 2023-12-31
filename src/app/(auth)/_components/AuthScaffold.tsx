import css from "./AuthScaffold.module.scss";

export default function AuthScaffold({ children }: { children: React.ReactNode }) {
    return <main className={css.scaffold}>{children}</main>;
}
