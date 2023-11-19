import { Content } from "~/utils/data";
import IconComponent from "../../svg/Icon";
import css from "./ComparisonSection.module.scss";

export default function ComparisonSection() {
    return (
        <section className={css.comparison}>
            <div className={css.tableHeader}>
                <div className={css.headerWrapper}>
                    <div className={css.tableFirst} />
                    <div className={css.tableCard}>
                        <h2>It's free</h2>
                        <h1>Starter</h1>
                        <button>Start</button>
                    </div>
                    <div className={css.tableCard}>
                        <h2>{"$20/ month"}</h2>
                        <h1>Investor</h1>
                        <button>Start</button>
                    </div>
                </div>
            </div>
            <div className={css.tableBody}>
                {Content.Plans.TableGroupData.map((group, index) => (
                    <TableGroup key={`tableGroup_${index}`} title={group.title} rows={group.rows} />
                ))}
            </div>
        </section>
    );
}

export type TableGroupData = {
    title: string;
    rows: TableRowData[];
};

type TableRowData = {
    label: string;
    starter: boolean | string;
    investor: boolean | string;
};

function TableGroup(props: TableGroupData) {
    return (
        <div className={css.tableGroup}>
            <h1>{props.title}</h1>
            {props.rows.map((row, index) => (
                <div className={css.tableRow} key={`tableRow_${index}`}>
                    <div className={css.tableFirst}>{row.label}</div>
                    <div className={css.tableColumn}>
                        {typeof row.starter === "boolean" ? (
                            row.starter ? (
                                <IconComponent.SupportedIcon />
                            ) : (
                                <IconComponent.UnsupportedIcon />
                            )
                        ) : (
                            <p>{row.starter}</p>
                        )}
                    </div>
                    <div className={css.tableColumn}>
                        {typeof row.investor === "boolean" ? (
                            row.investor ? (
                                <IconComponent.SupportedIcon />
                            ) : (
                                <IconComponent.UnsupportedIcon />
                            )
                        ) : (
                            <p>{row.investor}</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
