import React, { useState, useEffect } from "react";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PreviewBox from "./PreviewBox";
import fixedIcon from "../assets/fixed.png";
import carouselIcon from "../assets/carousel.png";

interface EmbedLinkProps {
  id: string | undefined;
  setShowEmbedLink: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmbedLink: React.FC<EmbedLinkProps> = ({ id, setShowEmbedLink }) => {
  const [step, setStep] = useState<"selectLayout" | "customize">(
    "selectLayout"
  );
  const [layoutType, setLayoutType] = useState<"carousel" | "fixed" | null>(
    null
  );
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

  const scriptAttrs = [
    `src="${backendUrl}/embed/embed.js"`,
    `data-project-id="${id}"`,
    `data-width="${width}"`,
    `data-layout="${layoutType}"`,
    ...(hideDate ? ['data-hide-date="true"'] : []),
    ...(showBorderOptions && borderRadius
      ? [`data-border-radius="${borderRadius}"`]
      : []),
    ...(showBorderOptions && borderColor
      ? [`data-border-color="${borderColor}"`]
      : []),
    ...(showBorderOptions && borderThickness
      ? [`data-border-thickness="${borderThickness}px"`]
      : []),
    ...(showShadowOptions && shadowSize
      ? [`data-shadow-size="${shadowSize}"`]
      : []),
    ...(showShadowOptions && shadowColor
      ? [`data-shadow-color="${shadowColor}"`]
      : []),
    ...(showShadowOptions && shadowBlur
      ? [`data-shadow-blur="${shadowBlur}"`]
      : []),
  ].filter(Boolean);

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
        className="relative w-full max-w-5xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6 rounded-2xl shadow-2xl text-white border border-blue-900/50 my-6 max-h-[calc(100vh-3rem)] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          className="absolute top-4 left-4 text-blue-400 hover:text-blue-300 transition-colors"
          onClick={() => setShowEmbedLink(false)}
          aria-label="Close modal"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {step === "selectLayout" && (
          <div className="space-y-6 text-white text-center">
            <h2 className="text-2xl font-bold text-blue-400">
              Choose Layout Type
            </h2>
            <p className="text-gray-300 text-sm">
              How do you want to display the reviews?
            </p>

            <div className="flex justify-center gap-6 mt-4">
              <button
                onClick={() => {
                  setLayoutType("fixed");
                  setStep("customize");
                }}
                className="bg-slate-700 hover:bg-slate-600 px-2 py-2 rounded-lg text-white border border-slate-500 shadow-lg hover:shadow-blue-500/30 transition-all flex flex-col justify-center items-center gap-2 w-60 h-70"
              >
                <div className="h-55">
                <img src={fixedIcon} alt="Fixed Layout" className="" />
                </div>
                <span className="text-sm">Fixed</span>
              </button>
              <button
                onClick={() => {
                  setLayoutType("carousel");
                  setStep("customize");
                }}
                className="bg-slate-700 hover:bg-slate-600 px-2 py-2 rounded-lg text-white border border-slate-500 shadow-lg hover:shadow-purple-500/30 transition-all flex flex-col items-center gap-2 w-60 h-70"
              >
                <div className="h-55 flex items-center">
                <img src={carouselIcon} alt="Carousel Layout" className="" />
                </div>
                <span className="text-sm">Carousel</span>
              </button>
            </div>
          </div>
        )}

        {step === "customize" && (
          <>
            {/* Header */}
            <h2 className="text-2xl font-bold text-blue-400 text-center mb-2 mt-6">
              Embed Your Reviews
            </h2>
            <p className="text-sm text-gray-400 text-center mb-6">
              Customize the widget, preview it live, and copy the code.
            </p>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Code and Customization */}
              <div className="space-y-6">
                {/* Embed Code */}
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-2">
                    Embed Code
                  </h3>
                  <div className="bg-[#1e293b]/50 p-4 rounded-lg border border-gray-700">
                    <pre className="text-xs sm:text-sm text-gray-300 whitespace-pre-wrap font-mono overflow-x-auto">
                      {fullEmbedCode}
                    </pre>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCopy}
                      className="mt-3 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
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
                </div>

                {/* Customization Options */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">
                    Customize Widget
                  </h3>
                  {/* Width */}
                  <div>
                    <label
                      htmlFor="width"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Card Width
                    </label>
                    <select
                      id="width"
                      className="w-full rounded-lg border border-gray-600 bg-[#1e293b] p-2.5 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
                      className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 transition"
                      checked={hideDate}
                      onChange={() => setHideDate((prev) => !prev)}
                      aria-label="Hide date"
                    />
                    <span className="text-sm text-gray-300">Hide Date</span>
                  </label>

                  {/* Border Options */}
                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 transition"
                        checked={showBorderOptions}
                        onChange={() => setShowBorderOptions((prev) => !prev)}
                        aria-label="Show border options"
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
                              className="w-full rounded-lg border border-gray-600 bg-[#1e293b] p-2.5 text-white text-sm focus:ring-2 focus:ring-blue-500"
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
                              className="w-full rounded-lg border border-gray-600 bg-[#1e293b] p-2.5 text-white text-sm focus:ring-2 focus:ring-blue-500"
                              onChange={(e) =>
                                setBorderThickness(e.target.value)
                              }
                              value={borderThickness}
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-sm text-gray-300 mb-1">
                              Border Color
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {[
                                "#3b82f6",
                                "#10b981",
                                "#f59e0b",
                                "#ef4444",
                                "#a855f7",
                              ].map((color, i) => (
                                <motion.button
                                  key={i}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className={`w-8 h-8 rounded-full border-2 ${
                                    borderColor === color
                                      ? "border-blue-500 ring-2 ring-blue-400"
                                      : "border-gray-600"
                                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                  style={{ backgroundColor: color }}
                                  onClick={() => setBorderColor(color)}
                                  aria-label={`Select border color ${color}`}
                                />
                              ))}
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
                        className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 transition"
                        checked={showShadowOptions}
                        onChange={() => setShowShadowOptions((prev) => !prev)}
                        aria-label="Show shadow options"
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
                              className="w-full rounded-lg border border-gray-600 bg-[#1e293b] p-2.5 text-white text-sm focus:ring-2 focus:ring-blue-500"
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
                              className="w-full rounded-lg border border-gray-600 bg-[#1e293b] p-2.5 text-white text-sm focus:ring-2 focus:ring-blue-500"
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
                                  className={`w-8 h-8 rounded-full border-2 ${
                                    shadowColor === color
                                      ? "border-blue-500 ring-2 ring-blue-400"
                                      : "border-gray-600"
                                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                  style={{ backgroundColor: color }}
                                  onClick={() => setShadowColor(color)}
                                  aria-label={`Select shadow color ${color}`}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Live Preview */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  Live Preview
                </h3>
                <div className="bg-white p-4 rounded-lg border border-gray-700 flex justify-center">
                  <PreviewBox
                    width={width}
                    borderRadius={borderRadius}
                    borderColor={borderColor}
                    borderThickness={borderThickness}
                    hideDate={hideDate}
                    shadowSize={shadowSize}
                    shadowColor={shadowColor}
                    shadowBlur={shadowBlur}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default EmbedLink;
