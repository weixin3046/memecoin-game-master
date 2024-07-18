"use client";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, ChakraProvider, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function RulePage() {
  return (
    <ChakraProvider>
      <Stack spacing={3} className="p-3">
        <Box className="relative">
          <Link href={"/"}>
            <ChevronLeftIcon boxSize={8} className="absolute top-3" />
          </Link>
        </Box>
        <Text className="text-center" fontSize={"xl"}>
          遊戲規則
        </Text>
        <Box>
          <Text fontSize={"lg"}> 1. 活動簡介</Text>
          <Text>
            歡迎來到任務中心！在這個活動中，BlossomChain用戶玩遊戲即可有機會獲得x元支付寶紅包和MeMeCoin。先到先得，請仔細閱讀以下規則，以確保您能順利參與並享受活動。
          </Text>
        </Box>
        <Box>
          <Text fontSize={"lg"}> 2. 活動時間 </Text>
          <Text>活動開始時間：2024年[開始日期] [開始時間]</Text>
          <Text>活動結束時間：2024年[結束日期] [結束時間] </Text>
        </Box>
        <Box>
          <Text fontSize={"lg"}>3. 參與對象 </Text>
          <Text>平台內所有用戶</Text>
        </Box>
        <Text fontSize={"lg"}>4. 活動流程 </Text>
        <Box>
          <Text>4.1 用戶註冊</Text>
          <Text>
            用戶註冊後，平台會送20個PEG給用戶，PEG可以兌換成TPEG，TPEG可用於玩遊戲，玩遊戲則有機會獲得支付寶紅包和MeMeCoin。
          </Text>
        </Box>
        <Box>
          <Text> 4.2 PEG兌換成TPEG</Text>
          <Text> 1. **登錄賬戶**：使用您的註冊賬戶登錄應用。</Text>
          <Text> 2. **選擇遊戲**：在應用內選擇您喜歡的遊戲開始遊玩。</Text>
          <Text>3. **完成任務**：按照遊戲內的提示完成指定任務或達成目標。</Text>
        </Box>
        <Box>
          <Text>4.3 玩遊戲</Text>
          <Text>1. **登錄賬戶**：使用您的註冊賬戶登錄應用。</Text>
          <Text>2. **選擇遊戲**：在應用內選擇您喜歡的遊戲開始遊玩。</Text>
          <Text>3. **完成任務**：按照遊戲內的提示完成指定任務或達成目標。</Text>
        </Box>
        <Box>
          <Text>4.3 獲得支付寶紅包</Text>
          <Text>
            1.
            **達成條件**：完成指定遊戲任務或達成目標後，您將有資格獲得支付寶紅包。
          </Text>
          <Text>
            2.
            **領取紅包**：活動期間，每位新用戶僅能領取一次紅包。紅包將自動發放到您綁定的支付寶賬戶中。
          </Text>
          <Text>3. **紅包金額**：紅包金額隨機，最高可達[最大金額]元。</Text>
        </Box>
        <Box>
          <Text>5. 注意事項</Text>
          <Text>
            -
            **活動公平**：請勿使用任何作弊手段參與活動，一經發現將取消獲獎資格。
          </Text>
          <Text>
            - **紅包使用**：支付寶紅包的具體使用規則請參考支付寶平台的相關規定。
          </Text>
          <Text>
            - **紅包使用**：支付寶紅包的具體使用規則請參考支付寶平台的相關規定。
          </Text>
        </Box>
        x
      </Stack>
    </ChakraProvider>
  );
}
