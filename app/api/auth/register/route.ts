import {connectDB} from "@/lib/mongoose";
import {NextRequest, NextResponse} from "next/server";
import {User} from "@/lib/models/user";
import {uploadImage} from "@/lib/uploadImage";

// validation
function validateInput(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}) {
    const {firstName, lastName, email, password} = data;

    if (!firstName || !lastName || !email || !password) {
        return "تمام فیلدها الزامی هستند.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "ایمیل معتبر نیست.";
    }

    if (password.length < 6) {
        return "رمز عبور باید حداقل ۶ کاراکتر باشد.";
    }

    return null;
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();
        const imageFile = formData.get("image");

        const firstName = formData.get("firstName")?.toString() || "";
        const lastName = formData.get("lastName")?.toString() || "";
        const email = formData.get("email")?.toString() || "";
        const password = formData.get("password")?.toString() || "";

        const validationError = validateInput({firstName, lastName, email, password});
        if (validationError) {
            return NextResponse.json({message: validationError}, {status: 400});
        }

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return NextResponse.json({message: "این ایمیل قبلاً ثبت شده است."}, {status: 400});
        }

        let imageUrl = "";
        if (imageFile instanceof File && imageFile.size > 0) {
            imageUrl = await uploadImage(imageFile);
        }

        await User.create({
            firstName,
            lastName,
            email,
            password,
            image: imageUrl,
        });

        return NextResponse.json({status: 201});
    } catch {
        return NextResponse.json({message: "مشکلی در ثبت‌نام پیش آمده است."}, {status: 500});
    }
}
