import {NextRequest, NextResponse} from "next/server";
import {connectDB} from "@/lib/mongoose";
import {Product} from "@/lib/models/product";
import mongoose from "mongoose";
import {uploadImage} from "@/lib/uploadImage";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();
        const imageFile = formData.get("image") as File;

        const name = formData.get("name")?.toString() || "";
        const category = formData.get("category")?.toString() || "";
        const description = formData.get("description")?.toString() || "";
        const price = Number(formData.get("price")) || 0;

        if (!name) {
            return NextResponse.json({error: "نام محصول لازم است."}, {status: 400});
        }

        if (!mongoose.Types.ObjectId.isValid(category)) {
            return NextResponse.json({error: "دسته‌بندی معتبر نیست."}, {status: 400});
        }

        if (!imageFile || !(imageFile instanceof File)) {
            return NextResponse.json({error: "تصویر معتبر نیست."}, {status: 400});
        }

        const imageUrl = await uploadImage(imageFile);

        const newProduct = await Product.create({
            name,
            description,
            price,
            image: imageUrl,
            category
        });

        return NextResponse.json(newProduct, {status: 201});

    } catch (error) {
        console.error("❌ Error creating product:", error);
        return NextResponse.json({error: "مشکلی پیش آمده است."}, {status: 500});
    }
}

export async function GET() {
    try {
        await connectDB();
        const products = await Product.find().populate("category");
        return NextResponse.json(products);
    } catch (error) {
        console.error("❌ Error getting products:", error);
        return NextResponse.json({error: "مشکلی پیش آمده است."}, {status: 500});
    }
}
