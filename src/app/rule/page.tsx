"use client";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, ChakraProvider, Container, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function RulePage() {
  return (
    <ChakraProvider>
      <Container>
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
              玩遊戲，領福利。歡迎大家來到玩9Gag遊戲，獲得MeMeCoin和支付寶紅包活動！活動期間，BlossomChain用戶玩遊戲即可獲得5元支付寶紅包和MeMeCoin（數量有限，先到先得）。請仔細閱讀以下規則，以確保您能順利領取遊戲福利。
            </Text>
          </Box>
          <Box>
            <Text fontSize={"lg"}> 2. 活動時間 </Text>
            <Text>2024年7月24日—7月31日</Text>
          </Box>
          <Box>
            <Text fontSize={"lg"}>3. 參與對象 </Text>
            <Text>BlossomChain平臺所有用戶（用戶可無限次參與遊戲）</Text>
          </Box>
          <Text fontSize={"lg"}>4. 活動流程 </Text>
          <Box>
            <Text>4.1 登錄賬戶</Text>
            <Text>登錄您的BlossomChain賬戶並進入任務中心。</Text>
          </Box>
          <Box>
            <Text> 4.2 兌換TPEG</Text>
            <Text>
              在遊戲頁面中，點擊“兌換”按鈕，將PEG轉換成TPEG。只需一鍵授權跨鏈合約，點擊確認按鈕後即跳轉到“遊戲加載頁”，加載結束即代表積分轉換成功。。
            </Text>
          </Box>
          <Box>
            <Text>4.3 開始遊戲</Text>
            <Text>
              每一局遊戲花費10個TPEG。如果您的TPEG餘額充足，應用將授權扣除相應數量的TPEG，並開始遊戲。如果TPEG餘額不足，您需要充值或購買PEG並兌換成TPEG才能繼續遊戲。
            </Text>
          </Box>
          <Box>
            <Text>4.4 遊戲進行</Text>
            <Text>
              用戶點擊金幣雨中的金幣，消耗積分並獲得金幣雨中的MeMeCoin。倒計時結束後，本局遊戲結束。
            </Text>
          </Box>
          <Box>
            <Text>4.5 領取福利</Text>
            <Text>
              獲得MeMeCoin後，用戶可以返回“任務中心”領取支付寶紅包（支付寶紅包數量有限，先到先得）。也可以選擇充值積分繼續參與遊戲，贏取更多的MeMeCoin。
            </Text>
          </Box>
          <Box>
            <Text>4.6 MEME轉移到錢包</Text>
            <Text>
              當用戶領取MeMeCoin後，應用會將MeMeCoin發放至“我的錢包”。用戶可以隨時前往錢包查看和管理自己的MeMeCoin資產。
            </Text>
          </Box>
          <Text fontSize={"lg"}>5. 注意事項</Text>
          <Box>
            <Text>5.1 TPEG餘額管理</Text>
            <Text>
              確保您的賬戶中有足夠的TPEG以便參與遊戲。可以通過充值或任務獲得更多的PEG並兌換成TPEG。
            </Text>
          </Box>
          <Box>
            <Text>5.2 公平遊戲</Text>
            <Text>
              請遵守遊戲規則，避免使用任何作弊手段。任何違規行爲可能導致賬戶被封禁並取消所有獎勵。
            </Text>
          </Box>
          <Box>
            <Text>5.3 數據安全</Text>
            <Text>
              我們會確保您的數據和資產安全。請注意保管好您的錢包密鑰，避免泄露。
            </Text>
          </Box>
          <Box>
            <Text>5.4 獎勵領取</Text>
            <Text>
              支付宝红包和MeMeCoin奖励数量有限，先到先得。請確保您提供的個人信息真實有效，以便顺利领取紅包。
            </Text>
          </Box>
          <Box>
            <Text>5.5 紅包使用</Text>
            <Text>
              支付寶紅包的具體使用規則請參考支付寶平臺的相關規定。希望大家享受這次活動並獲得豐厚的獎勵！如有任何疑問，請隨時聯繫BlossomChain客服團隊。
            </Text>
          </Box>
          <Box>
            <Text className="pt-6">
              注：$MEME是9GAG旗下獨立的Web3創業工作室Memeland的本地生態系統代幣。目前，$MEME在所有模因代幣中按市值排名第11。其歷史最高價（ATH）爲2024年3月5日的0.056324美元，並在2023年11月14日交易量達到10.8億。$MEME是持有者數量排名前10的ERC-20代幣之一，擁有接近100萬個鏈上持有者。
            </Text>
          </Box>
          <Box>
            <Text>$MEME體現價值：</Text>
            <Text>（1）對普羅大衆：</Text>
            <Text>
              可免費申請即將推出的全球通行$MEME MASTER
              CARD，直接以扣賬卡使用，輕鬆方便把$MEME作日常消費！
            </Text>

            <Text>（2）對加密貨幣認知者：</Text>
            <Text>
              升值。可以到幣安、OKX、Gate.io等各大交易平臺或uniswap，兌換成USDC/USDT等穩定幣。
            </Text>
            <Text>（3）炒幣（涉及高風險，買家需自行評估）</Text>
            <Text>
              於Stakeland質押：用戶可質押他們的加密資產。例如$MEME或其他代幣，在特定時間內完成指定任務，以此來換取其他有前景的新項目代幣。
            </Text>
          </Box>
        </Stack>
      </Container>
    </ChakraProvider>
  );
}
