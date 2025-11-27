import prisma from "@/lib/prisma";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const eventType = evt.type;

    if (eventType === "user.created") {
      const data = evt.data;

      const userId = data.id;
      const email = data.email_addresses[0]?.email_address ?? "";
      const firstName = data.first_name?.trim() ?? "";
      const lastName = data.last_name?.trim() ?? "";

      await prisma.user.upsert({
        where: { clerkUserId: userId },
        update: {},
        create: {
          clerkUserId: userId,
          email,
          firstName,
          lastName
        },
      });

      return NextResponse.json({
        success: true,
        message: "User created in DB",
      });
    }

    if (eventType === "user.updated") {
      const data = evt.data;

      const email = data.email_addresses[0]?.email_address ?? "";
      const firstName = data.first_name?.trim() ?? "";
      const lastName = data.last_name?.trim() ?? "";
      
      await prisma.user.update({
        where: { clerkUserId: data.id },
        data: {
          email,
          firstName,
          lastName
        },
      });
    }

    if (eventType === "user.deleted") {
      const data = evt.data;
      await prisma.user.delete({
        where: { clerkUserId: data.id },
      });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }
}
