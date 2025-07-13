import prisma from "@/lib/prisma";

export async function PUT(request, {params}) {
    const { id } = params;
    const { nama, telepon, email } = await request.json();

    if (!nama || !telepon || !email) {
       return new Response(JSON.stringify({ error: 'Field kosong'}), {status: 400});
    }

    const customer = await prisma.customer.update({
        where: { id: Number(id) },
        data: { nama, telepon, email },
    });

    const viewCustomer = {
        id: customer.id,
        nama: customer.nama,
        telepon: customer.telepon,
        email: customer.email
    };

    return new Response(JSON.stringify(viewCustomer), { status: 200 }); 
}

export async function DELETE(request, {params}) {
    const { id } = params;
    
    if (!id) return new Response(JSON.stringify({ error: "ID tidak ditemukan" }), 
        { status: 400 });

    const deletedCustomer = await prisma.customer.delete({
        where: { id: Number(id) },
    });
        
    return new Response(JSON.stringify({ message: "Berhasil dihapus"}), 
        { status: 200 });
}