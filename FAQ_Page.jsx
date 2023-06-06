import React, { useState } from 'react';
import './FAQPage.css';

const FAQPage = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleAnswer = (index) => {
    setActiveQuestion(index === activeQuestion ? null : index);
  };

  const faqData = [
    {
      question: 'Apa yang membuat Candi Borobudur menjadi tujuan wisata yang menarik?',
      answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      question: 'Apa saja fasilitas yang tersedia di Taman Mini Indonesia Indah?',
      answer: 'You can contact our support team by emailing support@example.com or calling +1-123-456-7890.',
    },
    {
      question: 'Apa yang membuat Pura Uluwatu menjadi tujuan wisata yang populer di Bali?',
      answer: 'Yes, you can cancel your subscription by visiting the "Account Settings" page and following the instructions.',
    },
    {
        question: 'Apa yang menarik dari Tirta Gangga di Bali Timur?',
        answer: 'Yes, you can cancel your subscription by visiting the "Account Settings" page and following the instructions.',
    },
    {
        question: 'Apa yang membuat Masjid Raya Baiturrahman Aceh menjadi tempat yang menarik untuk dikunjungi?',
        answer: 'Yes, you can cancel your subscription by visiting the "Account Settings" page and following the instructions.',
    },
    {
        question: 'Apa yang membuat Kota Tua Jakarta menarik untuk dikunjungi?',
        answer: 'Yes, you can cancel your subscription by visiting the "Account Settings" page and following the instructions.',
    },
    {
        question: 'Apa yang menarik dari Setu Babakan di Jakarta Selatan?',
        answer: 'Yes, you can cancel your subscription by visiting the "Account Settings" page and following the instructions.',
    },
    {
        question: 'Berapa biaya masuk ke Museum Wayang?',
        answer: 'Yes, you can cancel your subscription by visiting the "Account Settings" page and following the instructions.',
    },
    {
        question: 'Berapa biaya tiket masuk ke Museum Nasional Indonesia?',
        answer: 'Yes, you can cancel your subscription by visiting the "Account Settings" page and following the instructions.',
    },
    {
        question: 'Apa yang menarik dari Klenteng Boen Tek Bio di Tangerang?',
        answer: 'Yes, you can cancel your subscription by visiting the "Account Settings" page and following the instructions.',
    },
    {
        question: 'Apa yang membuat Monumen Perjuangan Rakyat di Bekasi menarik untuk dikunjungi?',
        answer: 'Yes, you can cancel your subscription by visiting the "Account Settings" page and following the instructions.',
    },
  ];

  const applicationFAQ = [
    {
      question: 'How do I download the application?',
      answer: 'You can download the application from the official app store for your device. Search for our app and click on the download/install button.',
    },
    {
      question: 'Can I use the application offline?',
      answer: 'Some features of the application may work offline, but certain functionalities may require an internet connection.',
    },
    // Add more application FAQs here
  ];

  return (
    <div className="faq-container">
      <div className="faq-section">
        <h2>Cultural Destination FAQs</h2>
        {FAQData.map((faq, index) => (
          <React.Fragment key={index}>
            <div
              className={`question ${activeQuestion === index ? 'active' : ''}`}
              onClick={() => toggleAnswer(index)}
            >
              {faq.question}
            </div>
            {activeQuestion === index && (
              <div className="answer">{faq.answer}</div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="faq-section">
        <h2>Application FAQs</h2>
        {applicationFAQ.map((faq, index) => (
          <React.Fragment key={index}>
            <div
              className={`question ${activeQuestion === index ? 'active' : ''}`}
              onClick={() => toggleAnswer(index)}
            >
              {faq.question}
            </div>
            {activeQuestion === index && (
              <div className="answer">{faq.answer}</div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
