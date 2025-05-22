import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/HashPassword';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            email: "adminkmipn@gmail.com",
            name: "Admin Kmipn",
            password: await hashPassword("Password!23"),
            role: "admin",
            verified: true
        }
    })

    console.log('User seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });