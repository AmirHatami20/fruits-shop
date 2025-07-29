import {NextRequest, NextResponse} from "next/server";
import {connectDB} from "@/lib/mongoose";
import {Product} from "@/lib/models/product";
import {ProductType} from "@/types";
import mongoose from "mongoose";

export async function GET(
    req: NextRequest,
    {params}: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const {id} = await params;

        if (mongoose.Types.ObjectId.isValid(id)) {
            const product = await Product.findById(id).populate("category");
            return NextResponse.json(product);
        } else {
            return NextResponse.json({message: "شناسه نامعتبر است."}, {status: 400});
        }
    } catch {
        return NextResponse.json({message: "خطا در دریافت محصول."}, {status: 500});
    }
}

export async function DELETE(
    req: NextRequest,
    {params}: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const {id} = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({message: "شناسه نامعتبر است."}, {status: 400});
        }

        const deleted = await Product.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json({message: "محصول پیدا نشد."}, {status: 404});
        }

        return NextResponse.json({message: "محصول با موفقیت حذف شد."});
    } catch {
        return NextResponse.json({message: "خطا در حذف محصول."}, {status: 500});
    }
}

export async function PUT(
    req: NextRequest,
    {params}: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const {id} = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({message: "شناسه نامعتبر است."}, {status: 400});
        }

        const body: Omit<ProductType, '_id'> = await req.json();

        const updated = await Product.findByIdAndUpdate(id, body, {new: true});

        if (!updated) {
            return NextResponse.json({message: "محصول پیدا نشد."}, {status: 404});
        }

        return NextResponse.json(updated);
    } catch {
        return NextResponse.json({message: "خطا در به‌روزرسانی محصول."}, {status: 500});
    }
}
