import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { password, token } = reqBody;

    const user = await User.findOne({
      forgotPasswordToken: token,
    });
    if (!user) {
      return NextResponse.json(
        { error: "user doesnt exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const newpassord = await bcryptjs.hash(password, salt);

    user.password = newpassord;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    const newdata = await user.save();

    return NextResponse.json({
      message: "successfully updated",
      success: true,
      data: newdata,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
