import Link from "next/link";
import { List, MessageSquare, Radio, Settings } from "lucide-react";
import { UserButton } from '@clerk/nextjs'

const navActions = [
    { icon: MessageSquare, label: "Chats", href: "/chats" },
    { icon: List, label: "Broadcast Lists", href: "/broadcast-lists" },
    { icon: Radio, label: "Broadcast", href: "/broadcast" }
];

const profileActions = [
    { icon: Settings, label: "Settings", href: "/settings" }
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-screen flex">
            <aside className="h-full p-4 flex flex-col justify-between items-center">
                <div className="sidebar-header mb-6">
                    <div className="logo bg-[var(--primary)] text-white font-bold w-10 aspect-square rounded-lg flex items-center justify-center">N</div>
                </div>

                <nav className="sidebar-nav flex-1 flex flex-col items-center">
                    <ul className="flex flex-col">
                        {navActions.map(action => {
                            const Icon = action.icon;

                            return (
                                <li key={action.href}>
                                    <Link href={action.href} className="action transition hover:bg-[var(--h-background)] text-zinc-700 w-10 aspect-square rounded-lg flex items-center justify-center">
                                        <Icon size={20} />
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <ul className="flex flex-col">
                        {profileActions.map(action => {
                            const Icon = action.icon;

                            return (
                                <li key={action.href}>
                                    <Link href={action.href}className="action transition hover:bg-[var(--h-background)] text-zinc-700 w-10 aspect-square rounded-lg flex items-center justify-center">
                                        <Icon size={20} />
                                    </Link>
                                </li>
                            )
                        })}

                        <div className="profile transition hover:bg-[var(--h-background)] text-zinc-700 w-10 aspect-square rounded-lg flex items-center justify-center">
                            <UserButton />
                        </div>
                    </ul>
                </div>
            </aside>

            <main className="flex-1 p-6 bg-[var(--bg-secondary)] ml-0 m-2 rounded-xl">
                {children}
            </main>
        </div>
    )
}