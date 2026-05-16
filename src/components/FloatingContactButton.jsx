"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function FloatingContactButton() {
  const locale = useLocale();
  const t = useTranslations("FloatingContactButton");
  const isRTL = locale === "ar";
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const whatsappNumber = "213782720266";

  const handleSendWhatsApp = () => {
    // Créer le message pour WhatsApp
    const whatsappMessage = `${message}`
      

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");

    // Réinitialiser et fermer
    setMessage("");
    setEmail("");
    setIsOpen(false);
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
        aria-label={t("ariaLabel")}
      >
        {isOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <MessageCircle className="w-7 h-7" />
        )}
      </button>

      {/* Popup/Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Card */}
          <div dir={isRTL ? "rtl" : "ltr"} className="absolute inset-x-4 bottom-4 md:top-1/2 md:bottom-auto md:right-6 md:left-auto md:-translate-y-1/2 bg-white dark:bg-gray-800 rounded-t-3xl md:rounded-3xl shadow-2xl w-auto md:w-96 max-w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-green-400 to-green-500 text-white p-6 rounded-t-3xl md:rounded-t-3xl flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6" />
                <div>
                  <h3 className="text-lg font-bold">{t("title")}</h3>
                  <p className="text-sm text-green-100">{t("subtitle")}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-green-600 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Message d'introduction */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {t("intro")}
                </p>
              </div>

          

              {/* Champ Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t("messageLabel")}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("messagePlaceholder")}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                />
              </div>

          

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={handleSendWhatsApp}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t("send")}
                </button>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  {t("whatsappNumberLabel")} +{whatsappNumber}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
