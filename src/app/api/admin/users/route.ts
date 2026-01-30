import { dbConnect } from "@/src/lib/dbConnect";
import { Provider } from "@/src/model/provider";
import { User } from "@/src/model/userSchema";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
const secret = process.env.NEXTAUTH_SECRET!;
export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = request.nextUrl;
    const isOwner = searchParams.get("session");
    if (isOwner) {
      const normalUsers = await User.find({ isOwner: false });
      const googleUsers = await Provider.find({ isOwner: false });
      const users = [...googleUsers, ...normalUsers];
      return NextResponse.json(
        { users, message: "user find successfully" },
        { status: 200 }
      );
    }
    const googleUsers = await Provider.find({ isAdmin: false });
    const normalUsers = await User.find({ isAdmin: false });
    const users = [...googleUsers, ...normalUsers];
    return NextResponse.json(
      { users, message: "user find successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Data Not Fetch" }, { status: 500 });
  }
}
export async function DELETE(request: NextRequest) {
  await dbConnect();
   const token = await getToken({ req: request, secret });
      if (!token?.isAdmin) {
        return NextResponse.json(
          { error: "Normal User can not Update" },
          { status: 401 },
        );
      }
  try {
    const { userID } = await request.json();
    const value = await User.findByIdAndDelete(userID);
    if (!value) {
      await Provider.findByIdAndDelete(userID);
    }
    return NextResponse.json(
      { message: "User Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "user not Deleted" }, { status: 500 });
  }
}
export async function PATCH(request: NextRequest) {
  await dbConnect();
   const token = await getToken({ req: request, secret });
      if (!token?.isOwner) {
        return NextResponse.json(
          { error: "Normal User can not Update" },
          { status: 401 },
        );
      }
  try {
    const { id, isAdmin } = await request.json();
    const user = await User.findByIdAndUpdate(id, {
      $set: { isAdmin: !isAdmin },
    });
    if (!user) {
      await Provider.findByIdAndUpdate(id, {
        $set: { isAdmin: !isAdmin },
      });
    }
    return NextResponse.json({ message: "Update the Role" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "user not Found" }, { status: 500 });
  }
}
