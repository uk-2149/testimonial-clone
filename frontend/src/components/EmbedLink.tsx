import React, { useState, useEffect } from "react";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EmbedLinkProps {
  id: string | undefined;
  setShowEmbedLink: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmbedLink: React.FC<EmbedLinkProps> = ({ id, setShowEmbedLink }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [hideDate, setHideDate] = useState<boolean>(false);
  const [width, setWidth] = useState("250px");
  const [showBorderOptions, setShowBorderOptions] = useState<boolean>(false);
  const [borderRadius, setBorderRadius] = useState("");
  const [borderColor, setBorderColor] = useState("");
  const [borderThickness, setBorderThickness] = useState("");
  const [showShadowOptions, setShowShadowOptions] = useState<boolean>(false);
  const [shadowSize, setShadowSize] = useState("");
  const [shadowColor, setShadowColor] = useState("");
  const [shadowBlur, setShadowBlur] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Construct script attributes dynamically to avoid extra whitespace
  const scriptAttrs = [
    `src="${backendUrl}/embed/embed.js"`,
    `data-project-id="${id}"`,
    `data-width="${width}"`,
    ...(hideDate ? ['data-hide-date="true"'] : []),
    ...(showBorderOptions && borderRadius ? [`data-border-radius="${borderRadius}"`] : []),
    ...(showBorderOptions && borderColor ? [`data-border-color="${borderColor}"`] : []),
    ...(showBorderOptions && borderThickness ? [`data-border-thickness="${borderThickness}px"`] : []),
    ...(showShadowOptions && shadowSize ? [`data-shadow-size="${shadowSize}"`] : []),
    ...(showShadowOptions && shadowColor ? [`data-shadow-color="${shadowColor}"`] : []),
    ...(showShadowOptions && shadowBlur ? [`data-shadow-blur="${shadowBlur}"`] : []),
  ].filter(Boolean); // Remove any falsy values

  const scriptCode = `<script ${scriptAttrs.join(" ")}></script>`;

  const fullEmbedCode = `<div id="review-widget"></div>\n${scriptCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullEmbedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowEmbedLink(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [setShowEmbedLink]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-2xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6 rounded-2xl shadow-2xl text-white border border-blue-900/50 my-6 max-h-[calc(100vh-3rem)] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          className="absolute top-4 left-4 text-blue-400 hover:text-blue-300 transition-colors"
          onClick={() => setShowEmbedLink(false)}
          aria-label="Close"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 className="text-xl sm:text-2xl font-bold text-blue-400 text-center mb-2 mt-5">
          Embed Your Reviews
        </h2>
        <p className="text-sm text-gray-400 text-center mb-4">
          Customize and copy the code to embed reviews on your site.
        </p>

        {/* Embed Code */}
        <div className="bg-[#1e293b]/50 p-4 rounded-lg mb-4 border border-gray-700">
          <pre className="text-xs sm:text-sm text-gray-300 whitespace-pre-wrap font-mono overflow-x-auto max-w-full">
            {fullEmbedCode}
          </pre>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="mt-2 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Code
              </>
            )}
          </motion.button>
        </div>

        {/* Customization Options */}
        <div className="space-y-4">
          {/* Width */}
          <div>
            <label
              htmlFor="width"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Card Width
            </label>
            <select
              id="width"
              className="w-full rounded-lg border border-gray-600 bg-[#1e293b] p-2 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              onChange={(e) => setWidth(e.target.value)}
              value={width}
            >
              <option value="250px">Small (250px)</option>
              <option value="350px">Medium (350px)</option>
              <option value="450px">Large (450px)</option>
            </select>
          </div>

          {/* Hide Date */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              checked={hideDate}
              onChange={() => setHideDate((prev) => !prev)}
            />
            <span className="text-sm text-gray-300">Hide Date</span>
          </label>

          {/* Border Options */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                checked={showBorderOptions}
                onChange={() => setShowBorderOptions((prev) => !prev)}
              />
              <span className="text-sm text-gray-300">Show Border</span>
            </label>
            <AnimatePresence>
              {showBorderOptions && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  <div>
                    <label
                      htmlFor="radius"
                      className="block text-sm text-gray-300 mb-1"
                    >
                      Border Radius
                    </label>
                    <select
                      id="radius"
                      className="w-full rounded-lg border border-gray-600 bg-[#1e293b] p-2 text-white text-sm"
                      onChange={(e) => setBorderRadius(e.target.value)}
                      value={borderRadius}
                    >
                      <option value="0px">None</option>
                      <option value="10px">Small</option>
                      <option value="20px">Medium</option>
                      <option value="30px">Large</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">
                      Thickness (px)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={10}
                      className="w-full rounded-lg border border-gray-600 bg-[#1e293b] p-2 text-white text-sm"
                      onChange={(e) => setBorderThickness(e.target.value)}
                      value={borderThickness}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-gray-300 mb-1">
                      Border Color
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#a855f7"].map(
                        (color, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`w-7 h-7 rounded-full border-2 ${
                              borderColor === color
                                ? "border-blue-500 ring-2 ring-blue-400"
                                : "border-gray-600"
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => setBorderColor(color)}
                            aria-label={`Select color ${color}`}
                          />
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Shadow Options */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                checked={showShadowOptions}
                onChange={() => setShowShadowOptions((prev) => !prev)}
              />
              <span className="text-sm text-gray-300">Show Shadow</span>
            </label>
            <AnimatePresence>
              {showShadowOptions && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  <div>
                    <label
                      htmlFor="shadowSize"
                      className="block text-sm text-gray-300 mb-1"
                    >
                      Shadow Size
                    </label>
                    <select
                      id="shadowSize"
                      className="w-full rounded-lg border border-gray-600 bg-[#1e293b] p-2 text-white text-sm"
                      onChange={(e) => setShadowSize(e.target.value)}
                      value={shadowSize}
                    >
                      <option value="3px">Small</option>
                      <option value="5px">Medium</option>
                      <option value="9px">Large</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">
                      Blur Radius
                    </label>
                    <select
                      id="blur"
                      className="w-full rounded-lg border border-gray-600 bg-[#1e293b] p-2 text-white text-sm"
                      onChange={(e) => setShadowBlur(e.target.value)}
                      value={shadowBlur}
                    >
                      <option value="0px">None</option>
                      <option value="2px">Light</option>
                      <option value="4px">Medium</option>
                      <option value="6px">Heavy</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-gray-300 mb-1">
                      Shadow Color
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "#60a5fa",
                        "#34d399",
                        "#fcd34d",
                        "#f87171",
                        "#c084fc",
                      ].map((color, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`w-7 h-7 rounded-full border-2 ${
                            shadowColor === color
                              ? "border-blue-500 ring-2 ring-blue-400"
                              : "border-gray-600"
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setShadowColor(color)}
                          aria-label={`Select color ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EmbedLink;