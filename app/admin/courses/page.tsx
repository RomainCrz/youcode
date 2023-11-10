import { Layout, LayoutContent, LayoutHeader, LayoutTitle } from "@/components/layout/layout"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getRequireAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"


export default async function CoursesPage() {
    const session = await getRequireAuthSession()

    const courses = await prisma.course.findMany({
        where: {
            creatorId: session.user.id
        }
    })
    return (
        <Layout>
            <LayoutHeader>
                <LayoutTitle>Courses</LayoutTitle>
                <LayoutContent>
                    <Card>
                        
                        <Table>
                            <TableHeader>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                            </TableHeader>
                            <TableBody>
                                {courses.map((course) => (
                                    <TableRow>
                                        <TableCell>
                                            <Avatar className="rounded">
                                                <AvatarFallback>{course.name[0]}</AvatarFallback>
                                                {course.image && <img src={course.image} alt={course.name} />}
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/admin/courses/${course.id}`}>
                                                {course.name}
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </LayoutContent>
            </LayoutHeader>
        </Layout>
    )
}