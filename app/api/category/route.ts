import {NextRequest, NextResponse} from "next/server";
import {connectDB} from "@/lib/mongoose";
import {Category} from "@/lib/models/category";
import {CategoryType} from "@/types";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body: Omit<CategoryType, '_id'> = await req.json();
        const {title, name} = body;

        if (!title || !name) {
            return NextResponse.json({error: "همه فیلدها الزامی‌اند."}, {status: 400});
        }

        const newCategory = await Category.create({title, name});

        return NextResponse.json(newCategory, {status: 201});
    } catch (error) {
        console.error("❌ Error creating category:", error);
        return NextResponse.json({error: "خطا در ثبت دسته‌بندی."}, {status: 500});
    }
}

export async function GET() {
    try {
        await connectDB();

        const categories = await Category.find();

        return NextResponse.json(categories, {status: 200});
    } catch (error) {
        console.error("❌ Error getting categories:", error);
        return NextResponse.json({error: "خطا در گرفتن دسته‌بندی‌ها."}, {status: 500});
    }
}
