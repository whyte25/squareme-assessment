import { deleteTransactions, getPaginatedTransactions } from "@/data";
import { TransactionsQueryParams } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page")!)
    : 1;
  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit")!)
    : 6;
  const from_date = searchParams.get("from_date") || undefined;
  const to_date = searchParams.get("to_date") || undefined;

  const queryParams: TransactionsQueryParams = {
    page,
    limit,
    from_date,
    to_date,
  };

  const response = getPaginatedTransactions(queryParams);

  return NextResponse.json(response?.data);
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();

    if (
      !body.transaction_ids ||
      !Array.isArray(body.transaction_ids) ||
      body.transaction_ids.length === 0
    ) {
      return NextResponse.json(
        { status: false, message: "transaction_ids array is required" },
        { status: 400 },
      );
    }

    const result = deleteTransactions(body.transaction_ids);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error deleting transactions:", error);
    return NextResponse.json(
      { status: false, message: "Failed to delete transactions" },
      { status: 500 },
    );
  }
}
