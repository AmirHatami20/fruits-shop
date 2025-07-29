import {NextRequest, NextResponse} from "next/server";
import {User} from "@/lib/models/user";
import jwt from "jsonwebtoken";
import {UserLoginInput, JwtPayload} from "@/types";
import {connectDB} from "@/lib/mongoose";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const {email, password}: UserLoginInput = await req.json();

        const user = await User.findOne({email});
        if (!user) {
            return NextResponse.json({message: "ایمیل نامعتبر است."}, {status: 401});
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return NextResponse.json({message: "رمز نامعتبر است."}, {status: 401});
        }

        const payload: JwtPayload = {
            _id: user._id.toString(),
            email: user.email,
            name: user.firstName,
        };

        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "7d"});

        return NextResponse.json({user, token}, {status: 200});
    } catch {
        return NextResponse.json({error: 'مشکلی پیش آمده است.'}, {status: 500});
    }
}
