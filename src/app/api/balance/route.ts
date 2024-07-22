import { auth } from "@/auth";
import { NextResponse } from "next/server";
type ApiResponse = {
  content: {
    allBlockchainAssetList: [
      {
        assetList: [
          {
            pointsName: string;
            pointsAmount: string;
          }
        ];
      }
    ];
  };
};
const findPointsAmount = (
  data: ApiResponse,
  pointsNameToFind: string
): string | null => {
  for (const blockchain of data.content.allBlockchainAssetList) {
    if (blockchain.assetList) {
      const asset = blockchain.assetList.find(
        (asset) => asset.pointsName === pointsNameToFind
      );
      if (asset) {
        return asset.pointsAmount;
      }
    }
  }
  return "0";
};

export async function GET() {
  try {
    const session = await auth();
    const token = session?.accessToken;
    const response = await fetch(
      `${process.env.BASE_API_URL}/changyou-wap-service/wallet/getWalletTotalAssetsV2`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch account balance");
    }
    const data = await response.json();
    if (data.code == "0") {
      const pointsAmount = findPointsAmount(data, "THKD Token 1");
      return NextResponse.json({ ...data, balance: pointsAmount });
    }
    return NextResponse.json({ ...data, balance: "0" });
  } catch (error) {
    return NextResponse.json({
      data: "0",
      msg: "error",
    });
  }
}
