import { Layout, LayoutContent, LayoutHeader, LayoutTitle } from "@/components/layout/layout";
import Link from "next/link";


export default function AdminPage() {
    return (
        <Layout>
            <LayoutHeader>
                <LayoutTitle>Courses</LayoutTitle>
                <LayoutContent>
                    <Link  href="/admin/courses">Courses</Link>
                </LayoutContent>
            </LayoutHeader>
        </Layout>
    )
}