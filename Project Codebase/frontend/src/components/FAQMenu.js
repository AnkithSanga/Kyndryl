import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './FAQMenu.css';

const API_BASE_URL = 'http://localhost:5000/api';

const FAQMenu = ({ language, onFAQSelect }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/faq/categories`, {
        params: { language }
      });
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const fetchCategoryFAQs = async (categoryId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/faq/category/${categoryId}`, {
        params: { language }
      });
      setFaqs(response.data.category?.faqs || []);
      setSelectedCategory(response.data.category);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    if (selectedCategory?.id === categoryId) {
      setSelectedCategory(null);
      setFaqs([]);
      setExpandedFAQ(null);
    } else {
      fetchCategoryFAQs(categoryId);
      setExpandedFAQ(null);
    }
  };

  const handleFAQClick = (faq) => {
    if (expandedFAQ === faq.question) {
      setExpandedFAQ(null);
    } else {
      setExpandedFAQ(faq.question);
      // Send FAQ question to chat
      if (onFAQSelect) {
        onFAQSelect(faq.question);
      }
    }
  };

  if (loading && categories.length === 0) {
    return (
      <div className="faq-menu-loading">
        <div className="loading-spinner"></div>
        <p>Loading FAQs...</p>
      </div>
    );
  }

  return (
    <div className="faq-menu-container">
      <div className="faq-header">
        <h3>📚 Frequently Asked Questions</h3>
        <p>Select a category to explore banking services</p>
      </div>

      <div className="faq-categories">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`faq-category-card ${selectedCategory?.id === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="category-icon">{category.icon}</div>
            <div className="category-title">{category.title}</div>
            <div className="category-arrow">
              {selectedCategory?.id === category.id ? '▼' : '▶'}
            </div>
          </div>
        ))}
      </div>

      {selectedCategory && faqs.length > 0 && (
        <div className="faq-list">
          <div className="faq-list-header">
            <h4>{selectedCategory.icon} {selectedCategory.title}</h4>
          </div>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${expandedFAQ === faq.question ? 'expanded' : ''}`}
              onClick={() => handleFAQClick(faq)}
            >
              <div className="faq-question">
                <span className="faq-number">{index + 1}.</span>
                <span className="faq-text">{faq.question}</span>
                <span className="faq-toggle">
                  {expandedFAQ === faq.question ? '▲' : '▼'}
                </span>
              </div>
              {expandedFAQ === faq.question && (
                <div className="faq-answer">
                  <div className="faq-answer-content">
                    {faq.answer.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FAQMenu;

