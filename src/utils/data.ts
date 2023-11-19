import { TableGroupData } from "~/app/_components/home/section/ComparisonSection";
import { FeatureData } from "~/app/_components/home/section/FeaturesSection";
import { PlanCardData } from "~/app/_components/home/section/PricingSection";
import { StatsCardData } from "~/app/_components/home/section/StatsSection";

export const LandingHeaderContentFull = "Auditor  -  Developer  -  Engineer  - ";
export const LandingHeaderContentMobile = "Developer Auditor Developer Auditor Developer Auditor Developer Auditor";

export const Content = {
    Features: {
        FeatureData: [
            { title: "Track", description: "Follow the state of all your open positions with live and manual price tracking." },
            { title: "Organize", description: "Keep every kind of asset or operation in its place, as your see fit." },
            { title: "Link", description: "Connect operations, investments, expenses and income to each other." },
            { title: "Analyze", description: "Exploit your data to make better decisions and improve your finances." },
        ] as FeatureData[],
    },
    Stats: {
        StatsCardData: [
            { label: "Assets Tracked", value: "45+" },
            { label: "Existing Records", value: "1k" },
            { label: "Total Value", value: "$600k" },
        ] as StatsCardData[],
    },
    Plans: {
        PlansCardData: [
            {
                label: "Try it Out",
                name: "Starter",
                price: "0",
                priceLabel: "Forever",
                description: "Essential features for casual use.",
                featuresTitle: "Access to:",
                features: ["Unlimited records.", "20 links / month.", "3 starting templates.", "5 custom assets."],
                alt: true,
            },
            {
                label: "Best Deal",
                name: "Investor",
                price: "20",
                priceLabel: "/ month",
                description: "Use with no limitations.",
                featuresTitle: "All Starter features, plus:",
                features: [
                    "Unlimited links.",
                    "10 starting templates.",
                    "Unlimited custom assets.",
                    "Access to in-depth analytics.",
                    "Features Early Access.",
                    "Data Encryption.",
                    "Premium support.",
                ],
                alt: false,
            },
        ] as PlanCardData[],
        TableGroupData: [
            {
                title: "Features",
                rows: [
                    { label: "Unlimited records", starter: true, investor: true },
                    { label: "Unlimited links", starter: "20", investor: true },
                    { label: "Unlimited custom assets", starter: "10", investor: true },
                    { label: "Early Access to new features", starter: false, investor: true },
                ],
            },
            {
                title: "Data and Usage",
                rows: [
                    { label: "Saved Records", starter: true, investor: true },
                    { label: "Data Backup", starter: "< 30 days", investor: true },
                ],
            },
            {
                title: "Privacy and Security",
                rows: [
                    { label: "Two-Factor Authentication", starter: true, investor: true },
                    { label: "Data Encryption", starter: false, investor: true },
                ],
            },
            {
                title: "Customer Support",
                rows: [
                    { label: "Documentation", starter: true, investor: true },
                    { label: "Email Support", starter: true, investor: true },
                    { label: "Live Chat", starter: false, investor: true },
                    { label: "Priority Response Time", starter: false, investor: true },
                    { label: "Dedicated Account Manager", starter: false, investor: true },
                    { label: "Discord Community", starter: true, investor: true },
                ],
            },
        ] as TableGroupData[],
    },
};
