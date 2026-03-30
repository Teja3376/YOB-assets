export const paymentsMock = [
  {
    _id: "1",
    createdAt: "2024-04-24",
    assetName: "Skyline Apartments",
    location: "Bhimavaram, AP",
    serviceType: "Token Minting Fee",
    feeAmount: 3500,
    status: "pending",

    paymentId: "PROP-7356",
    tier: "< $1M - 5M",
    feePercent: 0.35,
    reason:
      "The Token Minting Fee covers the end-to-end process of converting this real-world asset into blockchain-based tokens. This includes smart contract deployment, token creation, and secure distribution setup. Additionally, infrastructure costs such as node operations, transaction (gas) fees, and system monitoring are included. Administrative overhead like asset verification, compliance checks, and technical support during the minting process are also part of this fee. The pricing is tier-based depending on the asset valuation and expected token volume.",
  },
  {
    _id: "2",
    createdAt: "2024-04-24",
    assetName: "Green Tech Park",
    location: "Bhimavaram, AP",
    serviceType: "RWA Valuation Fee",
    feeAmount: 2500,
    status: "paid",

    paymentId: "PROP-7357",
    tier: "< $1M - 5M",
    feePercent: 0.25,
    reason:
      "The RWA (Real World Asset) Valuation Fee is charged for assessing the fair market value of the asset before tokenization. This involves financial analysis, market benchmarking, risk assessment, and validation of asset ownership and documents. The valuation ensures that token pricing is accurate, transparent, and aligned with investor expectations. This step is critical to maintain trust and liquidity in the marketplace.",
  },
  {
    _id: "3",
    createdAt: "2024-04-24",
    assetName: "New Sarna Nivas",
    location: "Hyderabad",
    serviceType: "Legal Deal Support Fee",
    feeAmount: 5000,
    status: "failed",

    paymentId: "PROP-7358",
    tier: "$5M - $10M",
    feePercent: 0.5,
    reason:
      "The Legal Deal Support Fee ensures that the asset tokenization process complies with all applicable regulations and legal frameworks. This includes drafting and reviewing contracts, verifying ownership rights, ensuring regulatory compliance, and structuring the deal for investor participation. Legal due diligence is performed to minimize risks, protect stakeholders, and ensure the asset can be securely and legally represented on-chain.",
  },
  {
    _id: "4",
    createdAt: "2024-04-25",
    assetName: "Ocean View Residency",
    location: "Vizag",
    serviceType: "Token Minting Fee",
    feeAmount: 4200,
    status: "pending",

    paymentId: "PROP-7359",
    tier: "< $1M - 5M",
    feePercent: 0.35,
    reason:
      "This minting fee includes the technical process of generating tokens for the asset and deploying them onto the blockchain network. It also covers backend infrastructure, transaction processing costs, and integration with the marketplace for trading. Additional effort is involved in configuring token supply, ownership distribution, and ensuring the tokens are securely issued and traceable.",
  },
  {
    _id: "5",
    createdAt: "2024-04-26",
    assetName: "Urban Heights",
    location: "Bangalore",
    serviceType: "RWA Valuation Fee",
    feeAmount: 3100,
    status: "paid",

    paymentId: "PROP-7360",
    tier: "$1M - $5M",
    feePercent: 0.3,
    reason:
      "The valuation fee supports a comprehensive analysis of the asset’s financial and market position. This includes reviewing comparable properties, estimating revenue potential, and assessing long-term investment viability. The goal is to determine a fair and data-backed valuation that ensures accurate token pricing and builds confidence among potential investors.",
  },
]

type Status = "pending" | "paid" | "failed"

export const updatePaymentStatus = (
  data: typeof paymentsMock,
  id: string,
  newStatus: Status
) => {
  return data.map((item) =>
    item._id === id
      ? { ...item, status: newStatus }
      : item
  )
}