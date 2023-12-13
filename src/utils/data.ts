import { FAQCardData } from "~/app/_components/home/FAQCard";
import { ReviewData } from "~/app/_components/home/ParallaxReviews";
import { TableGroupData } from "~/app/_components/home/section/ComparisonSection";
import { FeatureData } from "~/app/_components/home/section/FeaturesSection";
import { PlanCardData } from "~/app/_components/home/section/PricingSection";
import { StatsCardData } from "~/app/_components/home/section/StatsSection";

export const AnchorIDs = {
    Features: "features",
    Pricing: "pricing",
    Contact: "contact",
    FAQ: "faq",
    About: "about",
};

export const Content = {
    Features: {
        FeatureData: [
            {
                title: "Track",
                description: "Follow the state of all your open positions with live and manual price tracking.",
            },
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
    Reviews: {
        ReviewCardData: [
            {
                title: "Mediocre at best",
                review: "Not impressed with Scripr's limited capabilities. The promised linking between records is cumbersome, and the app lacks depth for serious investors. Needs major enhancements.",
                rating: 3,
            },
            {
                title: "My savior!",
                review: "Scripr rescued my finances! Its seamless tracking and budgeting features turned chaos into clarity. A must for savvy investors.",
                rating: 5,
            },
            {
                title: "User-Friendly Marvel",
                review: "As a finance newbie, Scripr made tracking investments a breeze. The intuitive interface and excellent support demystified the financial world for me.",
                rating: 5,
            },
            {
                title: "Affordability Master",
                review: "Scripr keeps my budget in check without breaking the bank. Affordable plans and priceless peace of mind. A few glitches, but nothing major.",
                rating: 4,
            },
            {
                title: "Confusing linking",
                review: "Linking transactions felt like a maze. Scripr needs a simpler process. Customer support was responsive, but the confusion overshadowed the experience.",
                rating: 2,
            },
            {
                title: "Investor's Haven",
                review: "Scripr is a financial haven! Tracking investments seamlessly with linked records is a game-changer. Support is top-notch. Worth every penny.",
                rating: 5,
            },
            {
                title: "Cloudy connectivity",
                review: "Scripr's cloud sync sometimes lags. A hiccup for a globetrotter like me. Sorting it out with support, but the occasional lag is a dampener.",
                rating: 3,
            },
            {
                title: "Budget bliss",
                review: "Scripr revolutionized my budgeting game. Connecting expenses and investments flawlessly. The pricing is reasonable, and the support is golden.",
                rating: 5,
            },
            {
                title: "Crypto saviour!",
                review: "Scripr handles crypto transactions like a pro! A paradise for crypto enthusiasts. The ability to link crypto and traditional investments is a genius move.",
                rating: 5,
            },
            {
                title: "Help needed",
                review: "Scripr overwhelmed me. Maybe too many features for a financial novice like me. Support tried, but I still feel lost in the app's complexities.",
                rating: 2,
            },
            {
                title: "Savings champ!",
                review: "Scripr turned me into a savings champion! The expense tracking is meticulous, and the investment insights are a goldmine. A financial ally worth every star.",
                rating: 4,
            },
            {
                title: "Great service!",
                review: "I had a great experience with this company. They were very professional and did an excellent job. I highly recommend them!",
                rating: 5,
            },
        ] as ReviewData[],
    },
};
