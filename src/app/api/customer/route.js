import prisma from '@/lib/prisma';

export async function GET() {
    const data = await prisma.customer.findMany({
        orderBy: { id: 'asc' },
    });

    const viewData = data.map((item) => ({
        id: item.id,
        nama: item.nama,
        telepon: item.telepon,
        email: item.email
    }));

    return new Response(JSON.stringify(viewData), { status: 200 });
}

export async function POST(request) {
    const { nama, telepon, email } = await request.json();
    
    if (!nama || !telepon || !email) {
        return new Response(JSON.stringify({ error: 'Semua field wajib diisi' }), {
         status: 400,
        });
    }

    const customer = await prisma.customer.create({
        data: { nama, telepon, email },
    });

    return new Response(JSON.stringify(customer), { status: 201 });
}