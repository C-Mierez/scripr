import { FAQCardData } from "~/app/_components/home/FAQCard";
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
    FAQ: {
        FAQCardData: [
            {
                question: "What is a record?",
                answer: "A record is a single entry in your accounting. It can be a transaction, an investment, a loan, a debt, an expense, etc.",
            },
            {
                question: "What is a link?",
                answer: "A link is a connection between two records. Each link has a type, which defines the nature of the connection.",
            },
            {
                question: "How does our pricing work?",
                answer: "Our transparent and self-serve model allows you to start small to keep your initial costs down and scale your analytics confidently as you grow. There are no overages if you exceed your plan, you simply pay for additional upgrades on the same cost per feature basis. You can go with one of our premade plans. Or if you need more help customizing an option that works for you, reach out to our sales team.",
            },
            {
                question: "How can I estimate my amount of links?",
                answer: "We recommend you to start with the Starter plan and upgrade to the Investor plan if you need more links. You can also build your own plan if you need more links but not the other features of the Investor plan.",
            },
            {
                question: "Can I go over my plan limits?",
                answer: "Yes, you can go over your plan limits. You will be charged for the extra links you use at the same cost per link as your plan. You can also upgrade to a higher plan if you need more links.",
            },
            {
                question: "I am a student. Can I get a discount?",
                answer: "Yes, we offer a free premium trial for your first year of use. Contact us to get your discount.",
            },
            { question: "Can I ask for my money back?", answer: "No." },
            {
                question: "Can I cancel my subscription?",
                answer: "Yes, you can cancel your subscription at any time. You will still have access to your account until the end of your billing period.",
            },
        ] as FAQCardData[],
    },
};
