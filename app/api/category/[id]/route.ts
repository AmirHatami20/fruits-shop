import {NextRequest, NextResponse} from "next/server";
import {connectDB} from "@/lib/mongoose";
import {Category} from "@/lib/models/category";
import {CategoryType} from "@/types";
import mongoose from "mongoose";

export async function DELETE(req: NextRequest, {params}: { params: { id: string } }) {
    try {
        await connectDB();

        const {id} = params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({error: "شناسه نامعتبر است."}, {status: 400});
        }

        const deleted = await Category.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json({error: "دسته‌بندی پیدا نشد."}, {status: 404});
        }

        return NextResponse.json({message: "دسته‌بندی با موفقیت حذف شد."});
    } catch (error) {
        console.error("❌ Error deleting category:", error);
        return NextResponse.json({error: "خطا در حذف دسته‌بندی."}, {status: 500});
    }
}

export async function PUT(req: NextRequest, {params}: { params: { id: string } }) {
    try {
        await connectDB();

        const {id} = params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({error: "شناسه نامعتبر است."}, {status: 400});
        }

        const body: Omit<CategoryType, "_id"> = await req.json();

        const updated = await Category.findByIdAndUpdate(id, body, {new: true});

        if (!updated) {
            return NextResponse.json({error: "دسته‌بندی پیدا نشد."}, {status: 404});
        }

        return NextResponse.json(updated);
    } catch (error) {
        console.error("❌ Error updating category:", error);
        return NextResponse.json({error: "خطا در به‌روزرسانی دسته‌بندی."}, {status: 500});
    }
}
