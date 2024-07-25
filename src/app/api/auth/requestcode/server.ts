"use server";
export async function requestCode(phone: string, areaCode: string) {
  try {
    console.log(
      `${process.env.BASE_API_URL}/changyou-wap-service/wapUser/getCodeV2`
    );
    const res = await fetch(
      `${process.env.BASE_API_URL}/changyou-wap-service/wapUser/getCodeV2`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          phoneNo: phone,
          areaCode: areaCode,
        }),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
