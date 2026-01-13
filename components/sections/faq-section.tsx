"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import Link from "next/link"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What is YOB Assets tokenization solution?",
      answer: "YOB Assets makes compliant onboarding and monitoring of your customers effortless with a unique one-stop-shop tailored to Issuers and Investors. It integrates best-in-class providers (KYC, KYB, KYT, AML, Wallet Screening), consolidates all customer data and alerts, automates compliance tasks and provides smart dashboards."
    },
    {
      question: "What is Know-Your-Customer (KYC)?",
      answer: "Know-Your-Customer (KYC) is a set of procedures that businesses use to verify the identities of their customers and understand the potential risks they might pose (verification of government-issued ID, selfie, proof of residence...). This is similar to how a bank might ask you for identification when you open an account.\n\nKYC helps prevent and minimize fraud, money laundering, and other types of financial crime. Most companies will need to employ an effective KYC tool to identify and verify their customers. YOB Assets offers KYC as part of its all-in-one compliance solution."
    },
    {
      question: "What is Know-Your-Business (KYB)?",
      answer: "Know-Your-Business (KYB) is a process similar to KYC (Know-Your-Customer) but that focuses specifically on businesses. When a business signs up with a cryptocurrency platform, KYB helps verify the legitimacy and ownership of the company. This might involve checking business registration documents, information about the company's owners and directors, and the nature of the business and its activities.\n\nKYB helps ensure that only reputable businesses are participating in the cryptocurrency ecosystem. This adds another layer of security and helps prevent fraud or misuse of the platform. YOB Assets offers KYB as part of its all-in-one compliance solution."
    },
    {
      question: "What is Know-Your-Transaction (KYT)?",
      answer: "Know-Your-Transaction (KYT) is an important step in business processes that goes beyond just knowing who your customer is (KYC). While KYC verifies the identity of a customer using the platform, KYT focuses on the transactions performed on the platform. This involves monitoring the customer's activity to identify any suspicious behavior.\n\nBy analyzing things like the source and destination of funds, transaction amounts, and frequency, KYT can help flag any activity that might be unusual or indicate potential money laundering, terrorist financing or other illegal actions. Companies operating in web3 space must employ effective tools for transaction monitoring. YOB Assets offers transaction monitoring and wallet screening."
    },
    {
      question: "What is AML Customer Screening?",
      answer: "AML stands for Anti-Money Laundering. Money laundering is the process of trying to hide the source of money obtained illegally. AML Customer Screening is one of the ways YOB Assets helps businesses comply with regulations to prevent money laundering from happening on their platform.\n\nDuring AML Customer Screening, YOB Assets checks the customers against special lists of people and businesses that governments and international organizations have identified as being high risk for money laundering or other illegal activities. These lists might include criminals, terrorists, or sanctioned entities. By comparing customers to these lists, YOB Assets can help identify potential risks and prevent bad actors from using the platform for illegal purposes."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="faqs-section">
      <div className="faqs-container">
        <div className="faqs-wrapper">
          <div className="faqs-top">
            <div className="faqs-subtitle-block">
              <div className="faqs-typography-title">FAQs</div>
            </div>
            <h2 className="faqs-heading-h2">Answers at a Glance</h2>
            <p className="faqs-center-align">
              Find quick answers to common questions about YOB Assets, from setup to security and support
            </p>
          </div>
          <div className="faqs-item-wrap">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faqs-list-wrap ${openIndex === index ? 'faqs-active' : ''}`}
              >
                <div 
                  className="faqs-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <h4 className="faqs-ques">{faq.question}</h4>
                  <div className="faqs-icon-wrapper">
                    {openIndex === index ? (
                      <Minus size={24} className="faqs-icon" />
                    ) : (
                      <Plus size={24} className="faqs-icon" />
                    )}
                  </div>
                </div>
                <div className={`faqs-answer ${openIndex === index ? 'faqs-answer-open' : ''}`}>
                  <p className="faqs-para">
                    {faq.answer.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < faq.answer.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
